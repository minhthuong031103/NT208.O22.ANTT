/** @format */

import { DataTable } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader/Loader';
import { useModal } from '@/hooks/useModal';
import { usePartners } from '@/hooks/usePartners';
import { useTable } from '@/hooks/useTable';
import { CustomerViewModal } from '../Customers/Modals/CustomerViewModal';
import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { CustomerStatusConfirmationModal } from '../Customers/Modals/CustomerStatusConfirmationModal';
import { PostPartnerStatus } from './PartnersColumns';
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export default function PartnersTable<TData, TValue>({ columns }: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const { getPartners, countPartners } = usePartners();
  const { modal, onCloseEditModal } = useModal();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { tableStore, onStopRefetchTable } = useTable();
  const [selectedTab, setSelectedTab] = React.useState('pending');
  useEffect(() => {
    setSelectedItem(modal?.data);
  }, [modal]);

  const keyName = 'Partners';

  function makeStatusQuery(status) {
    switch (status) {
      case 'all':
        return null;
      case 'cho_duyet':
        return ['cho_duyet', ''];
      default:
        return status;
    }
  }

  const { data, isFetching, refetch } = useQuery({
    queryKey: [keyName, currentPage, limit, search, selectedTab],
    // refetchInterval: 1000 * 60 * 1,
    staleTime: 1000 * 60 * 1,
    queryFn: () =>
      getPartners({
        duyetDoiTac: makeStatusQuery(selectedTab),
        search: search,
        start: (currentPage - 1) * limit,
        count: limit,
      }),
    keepPreviousData: true,
  });
  useEffect(() => {
    countPartners({ duyetDoiTac: makeStatusQuery(selectedTab) }).then(({ count }) => {
      setTotalPages(Math.ceil(count / limit));
    });
    setSearch('');
    setCurrentPage(1);
    refetch();
  }, [limit, selectedTab]);
  // setLimit(1);
  // useEffect(() => {
  //   refetch()
  // }, [selectedTab])
  useEffect(() => {
    if (tableStore.refetch) {
      refetch();
      onStopRefetchTable();
    }
  }, [tableStore]);

  console.log(data);

  const tabs = [
    {
      id: 'cho_duyet',
      label: 'Chờ duyệt',
    },
    {
      id: 'da_duyet',
      label: 'Đã duyệt',
    },
    {
      id: 'da_khoa',
      label: 'Đã khóa',
    },
    {
      id: 'all',
      label: 'Tất cả',
    },
  ];

  return (
    <div>
      <Tabs
        className='pt-4 lg:pt-0 mb-4'
        items={tabs}
        selectedKey={selectedTab}
        onSelectionChange={key => {
          setSelectedTab(key.toString());
        }}
      >
        {item => (
          <Tab key={item.id} title={item.label}>
            {/* <div>{selectedTab}</div> */}
            {data ? (
              <DataTable
                keyName={keyName}
                data={data}
                columns={columns}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                setLimit={setLimit}
                setSearch={setSearch}
                totalPages={totalPages}
                AddModal={null}
                // setTotalPages={setTotalPages}
                // AddModal={() => {
                //   return (
                //     <Button
                //       onClick={() => {
                //         onOpenAddModal();
                //       }}
                //     >
                //       <Plus className='w-4 h-4' />
                //     </Button>
                //   );
                // }}
              />
            ) : (
              <></>
            )}
          </Tab>
        )}
      </Tabs>
      {/* {data ? (
        <DataTable
          keyName={keyName}
          data={data}
          columns={columns}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          setLimit={setLimit}
          setSearch={setSearch}
          totalPages={totalPages}
          AddModal={null}
          setTotalPages={setTotalPages}
          // AddModal={() => {
          //   return (
          //     <Button
          //       onClick={() => {
          //         onOpenAddModal();
          //       }}
          //     >
          //       <Plus className='w-4 h-4' />
          //     </Button>
          //   );
          // }}
        />
      ) : null} */}

      {isFetching ? (
        <div className='w-full h-full items-center justify-center flex'>
          <Loader />
        </div>
      ) : null}
      {modal.viewModal ? <CustomerViewModal data={{ type: 'partner', ...selectedItem }} /> : null}
      {modal.editModal && selectedItem ? (
        <CustomerStatusConfirmationModal
          btnClass='w-16 h-14'
          onConfirm={() => {
            PostPartnerStatus(modal.data?.data.id, modal.data?.targetStatus, () => {
              refetch();
              onCloseEditModal();
            });
          }}
        />
      ) : null}
      {/* {modal.addModal ? (
        <CustomerAddModal />
      ) : null} */}
      {/* {modal.deleteModal ? <NewsDeleteModal refetch={refetch} /> : null} */}
    </div>
  );
}
