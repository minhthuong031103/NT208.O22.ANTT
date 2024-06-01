import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteurl = 'https://uitestate.io.vn/';

  const batdongsan = [siteurl + 'bat-dong-san/sitemap.xml'];
  const chinhSach = [siteurl + 'chinh-sach/sitemap.xml'];
  const doiTac = [siteurl + 'doi-tac/sitemap.xml'];

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: [siteurl + 'sitemap.xml', ...batdongsan, ...chinhSach, ...doiTac],
  };
}
