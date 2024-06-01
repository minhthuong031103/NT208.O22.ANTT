/** @format */
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

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
import { Pagination } from '@nextui-org/react';
import { downloadToExcel } from '@/lib/xlsx';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const formSchema = z.object({
  search: z.string(),
});
export default function CustomDataTable({
  data,
  columns,
  currentPage,
  setCurrentPage,
  limit,
  totalPages,
  keyName,
  setSearch,
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });
  const queryClient = useQueryClient();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const onSearch = async data => {
    if (!data.search) {
      await queryClient.refetchQueries({
        queryKey: [keyName, 1, limit, data.search],
        exact: true,
        type: 'all',
      });
    }

    setSearch(data.search);
    setCurrentPage(1);
  };

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bounds = tableRef.current?.getBoundingClientRect();
    if (bounds && bounds.top < 0) {
      tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className=' flex flex-col'>
      <div className='flex flex-row justify-between'>
        <div className='w-[50%] mb-5 space-x-2 flex flex-row flex-wrap'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)}>
              <FormField
                control={form.control}
                name='search'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className='w-64' {...field} placeholder='Search here...' />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

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
        <div className='flex flex-col space-y-1'>
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
              color='default'
              size={'lg'}
              onChange={page => {
                setCurrentPage(page);
                // tableRef.current?.scrollIntoView({behavior: "smooth"})
              }}
              page={currentPage}
              total={totalPages}
              initialPage={1}
            />
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
        </div>
      ) : null}
    </div>
  );
}
