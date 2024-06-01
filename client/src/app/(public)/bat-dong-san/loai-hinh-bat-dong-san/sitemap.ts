import prisma from '@/lib/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await prisma.baiViet.findMany({});

  const creditCardUrls = res
    ? res?.map((card: any) => ({
        url:
          'https://uitestate.io.vn/' +
          'bat-dong-san/chi-tiet-bat-dong-san/' +
          card?.id,
        lastModified: card?.updatedAt,
      }))
    : [];

  return [
    {
      url: 'https://uitestate.io.vn/' + 'bat-dong-san/chi-tiet-bat-dong-san/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      // priority: 1,
    },
    ...creditCardUrls,
  ];
}
