/** @format */

import { Button, ImageCus, Zoom } from '@/components';
import { Tooltip } from '@nextui-org/react';
import { BiHome, BiLockAlt } from 'react-icons/bi';
import { GiIsland } from 'react-icons/gi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsCoin } from 'react-icons/bs';
import { GoCodescanCheckmark } from 'react-icons/go';
import { MdApartment, MdOutlineSell } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { CgArrowsExpandRight } from 'react-icons/cg';
import { useModal } from '@/hooks/useModal';
import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar';
import { formatCurrency, parseJSON } from '@/lib/utils';

export const PostsColumns: ColumnDef<any>[] = [
  {
    header: 'Tin bất động sản',
    accessorKey: 'hinhAnhSanPham',
    cell: ({ row }) => {
      const posts = row.original;
      return (
        <div className='flex flex-row flex-wrap gap-4 my-4'>
          <Zoom>
            <ImageCus
              src={parseJSON(row.getValue('hinhAnhSanPham'))[0]?.url}
              alt='thumbnail'
              className={`h-44 w-56 shrink-0 rounded-md object-cover object-center`}
            />
          </Zoom>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-4'>
              <div className='text-red-500 text-sm flex flex-row gap-1'>
                {posts?.loaiHinh?.loaiBDS?.name === 'Căn hộ' ? (
                  <MdApartment className='mt-1' />
                ) : posts?.loaiHinh?.loaiBDS?.name === 'Nhà ở' ? (
                  <BiHome className='mt-1' />
                ) : posts?.loaiHinh?.loaiBDS?.name === 'Văn phòng' ? (
                  <HiOutlineOfficeBuilding className='mt-1' />
                ) : (
                  <GiIsland className='mt-1' />
                )}
                {' - '}
                {posts?.loaiHinh?.name}
              </div>
              <div className='text-emerald-500 text-sm flex flex-row gap-1'>
                <MdOutlineSell className='mt-1' />
                {' - '}
                {posts.isChothue === true ? 'Cho thuê' : 'Đăng bán'}
              </div>
            </div>
            <div className='text-[24px] text-neutral-700 font-medium'>{posts.tieuDe}</div>
            <div className='text-neutral-500 text-base font-normal mt-1 w-[450px]'>
              <IoLocationOutline className='text-base float-left mr-1 mt-1' />
              {posts.diaChi}
            </div>
            <div className='text-neutral-500 font-medium text-sm flex gap-4 flex-wrap'>
              <div className='text-sm flex flex-row gap-1'>
                <CgArrowsExpandRight className='mt-1' /> {'Diện tích: '}
                {posts.dienTich}
                {'m2'}
              </div>
              <div className='text-sm flex flex-row gap-1'>
                <BsCoin className='mt-1' /> {'Giá: '}
                {formatCurrency(posts.gia)} {posts.isChothue === true ? '/ tháng' : ''}
              </div>
            </div>
            <div className='flex flex-row'>
              <Avatar className='w-8 h-8'>
                <AvatarImage src={posts?.user?.avatar} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <p className='ml-2 text-gray-500 text-[14px] mt-auto mb-auto'>{posts?.user?.name}</p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    header: 'Ngày gửi',

    accessorKey: 'ngayDang',
    cell: ({ row }) => {
      // const endDate = row.getValue('event_end_date') as any;
      return (
        <div className=''>{new Date(row.getValue('ngayDang')).toLocaleDateString('en-GB')}</div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const post = row.original;
      // return <NewsActions id={newsId} />;
      return (
        <>
          <DuyetAction data={post} />
        </>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
];
const DuyetAction = ({ data }) => {
  const { onOpenEditModal } = useModal();

  return (
    <Tooltip
      content={data?.trangThai === 'cho_duyet' ? 'Kiểm duyệt' : 'Khóa bài'}
      color={data?.trangThai === 'cho_duyet' ? 'success' : 'warning'}
      offset={-8}
      className='py-2 px-4 font-medium text-white'
    >
      <Button
        onClick={() => {
          onOpenEditModal({ data });
        }}
      >
        {data?.trangThai === 'cho_duyet' ? (
          <GoCodescanCheckmark className='w-4 h-4' />
        ) : (
          <BiLockAlt className='w-4 h-4' />
        )}
      </Button>
    </Tooltip>
  );
};
