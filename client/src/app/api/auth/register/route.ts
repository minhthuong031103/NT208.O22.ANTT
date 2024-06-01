import prisma from '@/lib/prisma';
import { uploadthingApi } from '@/lib/uploadthingServer';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const body = await req.formData();
  const email = body.get('email') as string;
  const name = body.get('name') as string;
  const password = body.get('password') as string;
  const anhChanDung = body.get('anhChanDung');
  const cmndMatTruoc = body.get('cmndMatTruoc');
  const cmndMatSau = body.get('cmndMatSau');
  const maSoCmnd = body.get('maSoCmnd') as string;
  if (
    !email ||
    !name ||
    !password ||
    !cmndMatTruoc ||
    !cmndMatSau ||
    !anhChanDung
  )
    return new Response('no body', { status: 400 });

  if (!body) return new Response('no body', { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user)
      return new Response(
        JSON.stringify({
          message: 'Tài khoản đã được đăng ký',
          status: 400,
        })
      );
    const cmndUrl = await new uploadthingApi().uploadFiles([
      cmndMatTruoc,
      cmndMatSau,
      anhChanDung,
    ]);
    console.log('🚀 ~ POST ~ cmndUrl:', cmndUrl);

    const create = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
        anhCCCDTruoc: cmndUrl[0].data.url,
        anhCCCDSau: cmndUrl[1].data.url,
        anhChanDung: cmndUrl[2].data.url,
        duyetKhachHang: 'cho_duyet',
        maSoCmnd: maSoCmnd,
      },
    });
    if (create) {
      const payload = jwt.sign(
        { email: email, name: name },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        { expiresIn: '30s' }
      );
      return new Response(
        JSON.stringify({
          message: 'Đăng ký thành công, vui lòng xác thực OTP',
          payload: payload,
          status: 200,
        })
      );
    }
  } catch (e) {
    console.log('🚀 ~ POST ~ e:', e);
    return new Response('error', { status: 500 });
  }

  return new Response('hello world');
}
