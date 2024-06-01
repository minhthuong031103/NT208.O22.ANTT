/** @format */

import { DataTable } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader/Loader';
import { useModal } from '@/hooks/useModal';
import { Tab, Tabs } from '@nextui-org/react';
import { usePosts } from '@/hooks/usePosts';
import DuyetKhoaModal from './Modals/DuyetKhoaModal';
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export default function PostsTable<TData, TValue>({ columns }: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [search2, setSearch2] = useState('');
  const { onGetPosts } = usePosts();
  const { modal } = useModal();
  // eslint-disable-next-line prefer-const
  let [type, setType] = useState('cho_duyet');

  const keyName = 'posts';
  const keyName2 = 'post2';
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['posts', currentPage, limit, search],
    // refetchInterval: 1000 * 60 * 1,
    staleTime: 1000 * 60 * 1,
    queryFn: () =>
      onGetPosts({
        page: currentPage,
        limit,
        search,
        type: 'cho_duyet',
      }),
    keepPreviousData: true,
  });
  const {
    data: data2,
    isFetching: isFetching2,
    refetch: refetch2,
  } = useQuery({
    queryKey: ['posts2', currentPage2, limit, search2],
    // refetchInterval: 1000 * 60 * 1,
    staleTime: 1000 * 60 * 1,
    queryFn: () =>
      onGetPosts({
        page: currentPage2,
        limit,
        search: search2,
        type: 'da_duyet',
      }),
    keepPreviousData: true,
  });

  return (
    <div className='mt-6'>
      <Tabs
        key={'tabList'}
        size={'lg'}
        radius='full'
        onSelectionChange={e => {
          setSearch('');
          setSearch2('');
          setCurrentPage(1);
          setCurrentPage2(1);
          if (e === 'choDuyet') {
            setType('cho_duyet');
            type = 'cho_duyet';
          } else {
            setType('da_duyet');
            type = 'da_duyet';
          }
        }}
      >
        <Tab key='choDuyet' title='Danh sách chờ duyệt'>
          {data?.data && type === 'cho_duyet' ? (
            <DataTable
              keyName={keyName}
              data={data?.data}
              columns={columns}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              limit={limit}
              setSearch={setSearch}
              totalPages={data?.totalPages}
              AddModal={undefined}
            />
          ) : null}
        </Tab>
        <Tab key='daDuyet' title='Danh sách đã duyệt'>
          {data2?.data && type === 'da_duyet' ? (
            <DataTable
              keyName={keyName2}
              data={data2?.data}
              columns={columns}
              currentPage={currentPage2}
              setCurrentPage={setCurrentPage2}
              limit={limit}
              setSearch={setSearch2}
              totalPages={data2?.totalPages}
              AddModal={undefined}
            />
          ) : null}
        </Tab>
      </Tabs>

      {isFetching || isFetching2 ? (
        <div className='w-full h-full items-center justify-center flex'>
          <Loader />
        </div>
      ) : null}
      {modal.editModal ? (
        <DuyetKhoaModal refetch={refetch} refetch2={refetch2} data={modal?.data} />
      ) : null}
    </div>
  );
}
