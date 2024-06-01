/** @format */

import { Button } from '@/components';
import { useModal } from '@/hooks/useModal';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect } from 'react';
import { usePartners } from '@/hooks/usePartners';
import { CommonSvg } from '@/assets/CommonSvg';
import { Tooltip } from '@nextui-org/react';
import { IoLocationOutline } from 'react-icons/io5';

export async function PostPartnerStatus(id: number, newStatus: string, callback: () => any) {
  const { setPartnerStatus } = usePartners();
  // const {onRefetchTable} = useTable();
  const res = await setPartnerStatus({ id: id, newStatus: newStatus });
  callback();
  return res;
}

function CellActions(row: any) {
  const data = row.original;
  const out: React.ReactElement[] = [];

  const { modal, onOpenViewModal, onOpenEditModal } = useModal();
  useEffect(() => {}, [modal]);
  const btnClass = 'w-12 h-12';

  out.push(
    <Tooltip content='Chi tiết' offset={-8} className='py-2 px-4 font-medium text-slate-800 z-10'>
      <Button
        className={btnClass}
        onClick={() => {
          onOpenViewModal({ data: row.original });
        }}
      >
        {CommonSvg.user_info()}
      </Button>
    </Tooltip>,
  );

  let targetStatus;
  switch (data.duyetDoiTac) {
    default:
    case 'cho_duyet':
      targetStatus = 'da_duyet';
      break;
    case 'da_duyet':
      targetStatus = 'da_khoa';
      break;
    case 'da_khoa':
      targetStatus = 'da_duyet';
      break;
  }

  const targetStatusDisp = (() => {
    switch (data.duyetDoiTac) {
      default:
      case 'cho_duyet':
        return 'Duyệt';
      case 'da_duyet':
        return 'Khóa';
      case 'da_khoa':
        return 'Mở khóa';
    }
  })();

  out.push(
    <Tooltip
      content={targetStatusDisp}
      offset={-8}
      className='py-2 px-4 font-medium text-white z-10'
      color={
        data.duyetDoiTac === 'cho_duyet'
          ? 'success'
          : data.duyetDoiTac === 'da_duyet'
          ? 'warning'
          : 'success'
      }
    >
      <Button
        className={btnClass}
        onClick={() => {
          onOpenEditModal({
            data: { data: data, title: targetStatusDisp, targetStatus: targetStatus },
          }); // hmm
        }}
      >
        {(() => {
          switch (data.duyetDoiTac) {
            default:
            case 'cho_duyet':
              return CommonSvg.user_verify;
            case 'da_duyet':
              return CommonSvg.user_lock;
            case 'da_khoa':
              return CommonSvg.user_unlock;
          }
        })()}
      </Button>
    </Tooltip>,
  );
  return <div className='flex gap-x-5 justify-end'>{out}</div>;
}

export const PartnersColumns: ColumnDef<any>[] = [
  {
    header: '',
    accessorKey: 'name',
    cell: ({ row }) => {
      return (
        <div className='flex flex-row flex-wrap gap-4 my-4'>
          <img
            src={row.original.avatar}
            alt='userAvatar'
            className={`h-28 w-28 shrink-0 rounded-md object-cover object-center`}
          />
          <div className='flex flex-col'>
            <div className='text-slate-800 text-xl font-medium mt-1 w-[450px]'>
              {row.original.name}
            </div>
            <div className='text-gray-600 flex flex-row gap-2 text-base font-normal mt-1 w-[450px]'>
              <p className='font-medium'>{'Email: '}</p>
              {row.original.email}
            </div>
            <div className='text-gray-600 flex flex-row gap-2 text-base font-normal mt-1 w-[450px]'>
              <p className='font-medium'>{'Liên hệ: '}</p>
              {row.original.phoneNumber}
            </div>
            <div className='flex text-gray-600 text-base font-normal mt-1 w-[450px] overflow-hidden truncate'>
              <div>
                <IoLocationOutline className='text-base mr-1 mt-1' />
              </div>
              {row.original.diaChi}
            </div>
          </div>
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      return CellActions(row);
    },
    enableHiding: false,
    enableSorting: false,
  },
];
