import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const url = 'https://uitestate.io.vn/';
  return [
    {
      url: url + 'bat-dong-san/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      // priority: 1,
    },
    {
      url: url + 'bat-dong-san/chi-tiet-bat-dong-san/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      // priority: 1,
    },
    {
      url: url + 'bat-dong-san/loai-hinh-bat-dong-san/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      // priority: 1,
    },
  ];
}
