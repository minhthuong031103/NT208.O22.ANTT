import { Metadata } from 'next';
import React from 'react';
const metadata: Metadata = {
  title: 'Chính sách | Minh Thường Estate | Môi giới bất động sản',
  applicationName: 'Minh Thường Estate',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: [
    'Minh Thường Estate',
    'môi giới bất động sản',
    'Minh Thường Estate bất động sản',
    'mua bán nhà đất',
    'nhà đất Minh Thường Estate',
    'đăng bài bất động sản',
    'Minh Thường Estate VN',
    'bất động sản VN',
    'tìm kiếm bất động sản',
    'bất động sản UIT',
  ],

  authors: [{ name: 'Minh Thường Estate' }],
  creator: 'Minh Thường Estate',
  publisher: 'Minh Thường Estate',
  category: 'bất động sản',
  manifest: 'https://uitestate.io.vn/manifest.webmanifest',
  description: `Minh Thường Estate là nền tảng môi giới bất động sản hàng đầu.
  Chúng tôi giúp bạn đăng bài và quản lý bất động sản một cách dễ dàng,
  giúp tăng cơ hội bán nhanh hơn.`,
  openGraph: {
    title: 'Minh Thường Estate | Môi giới bất động sản',
    description: `Minh Thường Estate là nền tảng môi giới bất động sản hàng đầu.
    Chúng tôi giúp bạn đăng bài và quản lý bất động sản một cách dễ dàng,
    giúp tăng cơ hội bán nhanh hơn.`,
    type: 'website',
    locale: 'vi_VN',
    url: 'https://uitestate.io.vn',
    siteName: 'Minh Thường Estate',
    images: [
      'https://example.com/images/property1.png',
      'https://example.com/images/property2.png',
      'https://example.com/images/property3.png',
    ],
  },
  metadataBase: new URL('https://uitestate.io.vn'),
  alternates: {
    canonical: 'https://uitestate.io.vn',
    languages: {
      'vi-VN': 'https://uitestate.io.vn',
    },
  },
  appLinks: {
    web: {
      url: 'https://uitestate.io.vn',
    },
  },
  twitter: {
    card: 'app',
    title: 'Minh Thường Estate',
    description: `Minh Thường Estate là nền tảng môi giới bất động sản hàng đầu.
    Chúng tôi giúp bạn đăng bài và quản lý bất động sản một cách dễ dàng,
    giúp tăng cơ hội bán nhanh hơn.`,
    siteId: '1234567890',
    creator: 'Minh Thường Estate',
    creatorId: '1234567890',
    images: {
      url: 'https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp',
      alt: 'Minh Thường Estate logo',
    },
    app: {
      name: 'Minh Thường Estate',
      id: {
        iphone: 'uitestate_app://iphone',
        ipad: 'uitestate_app://ipad',
        googleplay: 'uitestate_app://googleplay',
      },
      url: {
        iphone: 'https://uitestate.io.vn',
        ipad: 'https://uitestate.io.vn',
      },
    },
  },
};
async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full bg-slate-50">
      <div>{children}</div>
    </div>
  );
}

export default layout;
export { metadata };
