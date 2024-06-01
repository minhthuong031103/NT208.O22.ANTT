/** @format */
import {
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';

import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Form, FormItem, FormField, Input, FormControl } from '@/components';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from '@nextui-org/react';
import { Pagination } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import { downloadToExcel } from '@/lib/xlsx';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { CommonSvg } from '@/assets/CommonSvg';

const formSchema = z.object({
  search: z.string(),
});
export default function DataTable({
  data,
  columns,
  currentPage,
  setCurrentPage,
  limit,
  AddModal,
  totalPages,
  keyName,
  setSearch,
  ...props
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [showClearBtn, setShowClearBtn] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });
  console.log(totalPages);
  const queryClient = useQueryClient();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  const onSearch = async data => {
    if (!data.search) {
      await queryClient.refetchQueries({
        queryKey: [keyName, 1, limit, data.search],
        exact: true,
        type: 'all',
      });
    }
    setShowClearBtn(data.search);
    setSearch(data.search);
    setCurrentPage(1);
    form.setFocus('search');
  };

  const [selected, setSelected] = useState<any>(
    table
      .getAllColumns()
      .filter(column => column.getCanHide())
      .map(column => {
        if (column.getIsVisible()) return column.id;
      }),
  );

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bounds = tableRef.current?.getBoundingClientRect();
    if (bounds && bounds.top < 0) {
      tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // console.log(selected);
  return (
    <div className='flex flex-col' {...props}>
      <div className='flex flex-row justify-between'>
        <div className='w-[80%] mb-0 space-x-2 flex flex-row flex-wrap'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className='static'>
              <FormField
                control={form.control}
                name='search'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className={'w-64'} {...field} placeholder='Tìm kiếm...' />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
            {showClearBtn ? (
              <Tooltip closeDelay={0} content='Xóa'>
                <Button
                  className='p-4 w-12'
                  onClick={() => {
                    setSearch('');
                    form.resetField('search');
                    setShowClearBtn(false);
                    form.setFocus('search');
                  }}
                  variant='outline'
                >
                  <X>w</X>
                </Button>
              </Tooltip>
            ) : (
              <></>
            )}
          </Form>

          <Tooltip closeDelay={0} content='Tìm kiếm'>
            <Button
              className='p-4 w-12 bg-transparent border-1 border-emerald-400 text-emerald-400 transition ease-in-out hover:scale-110 hover:bg-gray-50'
              onClick={form.handleSubmit(onSearch)}
            >
              {CommonSvg.search}
            </Button>
          </Tooltip>

          {/* <Dropdown>
            <DropdownTrigger>
              <Button variant={'outline'} className='ml-auto'>
                Chọn cột
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Multiple selection example'
              variant='flat'
              closeOnSelect={false}
              selectionMode='multiple'
              selectedKeys={selected}
              onSelectionChange={(keys: any) => {
                setSelected(keys);
              }}
            >
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownItem
                      key={column.id}
                      className='capitalize'
                      isSelected={column.getIsVisible()}
                      onPress={() => {
                        column.toggleVisibility(!column.getIsVisible());
                      }}
                    >
                      {column.id}
                    </DropdownItem>
                  );
                })}
            </DropdownMenu>
          </Dropdown> */}
        </div>
        {AddModal && AddModal()}
      </div>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <div className='text-sm text-muted-foreground flex flex-row gap-1 h-6'>
          <p className='font-medium'>{table.getFilteredSelectedRowModel().rows.length ?? 0}</p>{' '}
          trong <p className='font-medium'>{table.getFilteredRowModel().rows.length}</p> dòng đã
          chọn
        </div>
      ) : (
        <div className='h-6'></div>
      )}

      <div className='rounded-md border' ref={tableRef}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead className='' key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 0 ? (
        <div className='flex flex-col space-y-1 mt-4'>
          <div className='flex items-center justify-start space-x-2 py-4'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => {
                setCurrentPage(1);
              }}
              disabled={currentPage === 1}
            >
              <span className='sr-only'>Go to first page</span>
              <DoubleArrowLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            <Pagination
              size={'lg'}
              onChange={function (this: JSX.Element, page) {
                setCurrentPage(page);
                // tableRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              page={currentPage}
              total={totalPages}
              initialPage={1}
            />
            {/* <Pagination
            activePage={currentPage}
            boundaryRange={3}
            onPageChange={(e, item) => {
              setCurrentPage(item?.activePage);
            }}
            size='mini'
            siblingRange={1}
            totalPages={totalPages}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            // ellipsisItem={() => {
            //   return <div>...</div>;
            // }}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
          /> */}
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              disabled={currentPage === totalPages || currentPage > totalPages}
            >
              Sau
            </Button>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => {
                setCurrentPage(totalPages);
              }}
              disabled={currentPage === totalPages || currentPage > totalPages}
            >
              <span className='sr-only'>Go to last page</span>
              <DoubleArrowRightIcon className='h-4 w-4' />
            </Button>
          </div>
          {/* <div className='flex space-y-3 space-x-3 mb-3 items-center flex-wrap'>
            <div className='flex space-x-2 items-center w-full'>
              <div className='flex text-sm font-medium'>
                Trang {currentPage}, tổng số: {totalPages}
              </div>
              <div className=''>|</div>
              <p className='text-sm font-medium'>Số dòng trên trang:</p>
              <Select
              value={`${limit}`}
              onValueChange={value => {
                setLimit(Number(value));
              }}
            >
              <SelectTrigger className='h-8 w-[70px]'>
                <SelectValue placeholder={limit} />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            </div>
          </div> */}
        </div>
      ) : null}
    </div>
  );
}
