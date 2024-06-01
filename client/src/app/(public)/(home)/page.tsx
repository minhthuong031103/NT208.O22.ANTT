import React from 'react';
import dynamic from 'next/dynamic';
import SearchHome from './(components)/SearchHome';
import TypeCollection from './(components)/TypeCollection';
const BatDongSanNoiBatHome = dynamic(
  () => import('./(components)/BatDongSanNoiBat'),
  { ssr: true }
);
const BatDongSanKhuVuc = dynamic(
  () => import('./(components)/BatDongSanKhuVuc'),
  { ssr: true }
);
const Banner = dynamic(() => import('./(components)/Banner'), { ssr: true });
const FindMore = dynamic(() => import('./(components)/FindMore'), {
  ssr: true,
});

const page = async () => {
  return (
    <div className="mt-0 flex h-full w-full flex-col">
      <SearchHome />
      <TypeCollection />
      <BatDongSanNoiBatHome />
      <BatDongSanKhuVuc />
      <Banner />
      <FindMore />
    </div>
  );
};
export default page;
