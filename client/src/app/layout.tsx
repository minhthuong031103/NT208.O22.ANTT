import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '../../context/AuthProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
  weight: '500',
});

const metadata: Metadata = {
  title: 'Trang chủ | Minh Thường Estate | Môi giới bất động sản',
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
      'https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp',
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

import { Providers } from './Providers';
import { Web3Provider } from '../../context/Web3Provider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </head>

      <body
        className={`${montserrat.variable} ${montserrat.style.fontWeight}`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <Providers>
          <Web3Provider>
            <QueryProvider>
              <AuthProvider>
                <Toaster />
                {children}
              </AuthProvider>
            </QueryProvider>
          </Web3Provider>
        </Providers>
      </body>
    </html>
  );
};
export { metadata };
export default RootLayout;
