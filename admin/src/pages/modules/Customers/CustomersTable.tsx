/** @format */

import { DataTable } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader/Loader';
import { useModal } from '@/hooks/useModal';
import { useCustomers } from '@/hooks/useCustomers';
import { useTable } from '@/hooks/useTable';
import { CustomerViewModal } from './Modals/CustomerViewModal';
import { Tab, Tabs } from '@nextui-org/react';
import { CustomerStatusConfirmationModal } from './Modals/CustomerStatusConfirmationModal';
import { PostCustomerStatus } from './columns';
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export default function CustomersTable<TData, TValue>({ columns }: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const { getCustomers, countCustomers } = useCustomers();
  const { modal, onCloseEditModal } = useModal();
  const { tableStore, onStopRefetchTable } = useTable();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState('cho_duyet');
  useEffect(() => {
    setSelectedItem(modal?.data);
  }, [modal]);
  const keyName = 'news';

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
    queryKey: ['news', currentPage, limit, search],
    // refetchInterval: 1000 * 60 * 1,
    staleTime: 1000 * 60 * 1,
    queryFn: () =>
      getCustomers({
        duyetKhachHang: makeStatusQuery(selectedTab),
        search: search,
        start: (currentPage - 1) * limit,
        count: limit,
      }),
    keepPreviousData: true,
  });

  useEffect(() => {
    return;
  }, [data]);

  useEffect(() => {
    countCustomers({ duyetKhachHang: makeStatusQuery(selectedTab) }).then(({ count }) => {
      setTotalPages(Math.ceil(count / limit));
    });
    setSearch('');
    setCurrentPage(1);
    refetch();
  }, [limit, selectedTab]);

  useEffect(() => {
    if (tableStore.refetch) {
      refetch();
      onStopRefetchTable();
    }
  }, [tableStore]);
  // console.log(data);

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
              />
            ) : (
              <></>
            )}
          </Tab>
        )}
      </Tabs>

      {isFetching ? (
        <div className='w-full h-full items-center justify-center flex'>
          <Loader />
        </div>
      ) : null}
      {modal.viewModal ? <CustomerViewModal data={{ ...selectedItem, type: 'customer' }} /> : null}

      <CustomerStatusConfirmationModal
        btnClass='w-16 h-14'
        onConfirm={() => {
          PostCustomerStatus(modal.data?.data.id, modal.data?.targetStatus, () => {
            refetch();
            onCloseEditModal();
          });
        }}
      />
    </div>
  );
}
