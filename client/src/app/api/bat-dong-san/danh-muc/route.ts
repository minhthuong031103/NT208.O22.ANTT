import prisma from '@/lib/prisma';

export async function GET() {
  const res = await prisma.loaiBDS.findMany({
    include: {
      loaiHinhs: true
    },
  });
  if (!res)
    return new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
      status: 404,
    });
  return new Response(JSON.stringify(res), { status: 200 });
}
