'use server';
import prisma from '../lib/prisma';

export const muaLeAction = async ({
  userId,
  luot,
  luotChuyenNghiep,
  luotVip,
  type,
  amount,
}) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
  if (!user) return;
  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        luot: luot ? parseInt(luot) + user.luot : user.luot,
        luotChuyenNghiep: luotChuyenNghiep
          ? parseInt(luotChuyenNghiep) + user.luotChuyenNghiep
          : user.luotChuyenNghiep,
        luotVip: luotVip ? parseInt(luotVip) + user.luotVip : user.luotVip,
      },
    }),
    prisma.revenue.create({
      data: {
        serviceName: type,
        number:
          parseInt(luot) || parseInt(luotChuyenNghiep) || parseInt(luotVip),
        amount: amount ? parseInt(amount) : 0,
        user: {
          connect: {
            id: parseInt(userId),
          },
        },
      },
    }),
  ]);
};
