/** @format */

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { Divider, Select, SelectItem } from '@nextui-org/react';
import { useRevenue } from '@/hooks/useRevenue';
import { currencyFormat } from '@/lib/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#eb34eb'];

function convDataSum(data, filter) {
  if (!data) return [];
  const out = Array(12)
    .fill({})
    .map((_value, index) => ({
      name: `Tháng ${index + 1}`,
      month: index + 1,
      Total: 0,
    }));
  data.forEach(row => {
    if (filter === 'all' || row.serviceName === filter) {
      const date = new Date(row.createdAt);
      const month = out[date.getMonth()];
      month.Total += row.amount;
    }
  });
  return out;
}

function convDataRatio(data) {
  if (!data) return [];
  const dict: any[] = [];
  data.forEach(row => {
    if (!dict[row.serviceName]) {
      dict[row.serviceName] = {
        name: row.serviceName,
        value: 0,
      };
    }
    dict[row.serviceName].value += row.number;
  });
  const out: any[] = [];
  Object.keys(dict).forEach(key => {
    out.push(dict[key]);
  });
  return out;
}

function convDataProg(data) {
  // if (!data) return [];
  // const dict: any[] = [];
  // data.forEach(row => {
  //   if (!dict[row.serviceName]) {
  //     dict[row.serviceName] = {
  //       name: row.serviceName,
  //       data: Array(12)
  //       .fill({})
  //       .map((_value, index) => ({
  //         name: `Tháng ${index + 1}`,
  //         month: index + 1,
  //         total: 0,
  //       })),
  //     };
  //   }
  //   const date = new Date(row.createdAt);
  //   dict[row.serviceName].data[date.getMonth()].total += row.number;
  // });
  // const out: any[] = [];
  // Object.keys(dict).forEach(key => {
  //   out.push(dict[key]);
  // });
  // return out;
  if (!data) return [];
  const out = Array(12)
    .fill({})
    .map((_value, index) => ({
      name: `Tháng ${index + 1}`,
      month: index + 1,
      Total: 0,
    }));
  data.forEach(row => {
    const date = new Date(row.createdAt);
    const month = out[date.getMonth()];
    if (!month[row.serviceName]) {
      month[row.serviceName] = 0;
    }
    month[row.serviceName] += row.number;
  });
  return out;
}

function BarChartTooltip({ payload, label }) {
  return (
    <div className='bg-white rounded-xl shadow-md p-4'>
      <p>{payload ? currencyFormat(payload[0]?.value) : 0}</p>
      <p>{label}</p>
    </div>
  );
}

export function Overview() {
  const [sum, setSum] = useState(0);
  const [billNum, setBillNum] = useState(0);
  const form = useForm({
    defaultValues: {
      year: new Date().getFullYear(),
    },
  });
  const { getRevenue } = useRevenue();
  const year = form.watch('year');

  const [filter, setFilter] = useState('all');

  const { data } = useQuery({
    queryKey: ['revenue', year],
    queryFn: () => {
      return getRevenue({ year: year });
    },
  });

  useEffect(() => {
    setSum(0);
    setBillNum(data?.length);
    data?.forEach(row => {
      setSum(prev => prev + row.amount);
    });
  }, [data]);

  if (!data) return <></>;
  const dataBar = convDataSum(data, filter);
  const dataPie = convDataRatio(data);
  const dataLines = convDataProg(data);
  let max = 0;
  convDataSum(data, 'all').forEach(month => {
    max = month.Total > max ? month.Total : max;
  });
  max =
    Math.ceil(max / Math.pow(10, max.toString().length - 1)) *
    Math.pow(10, max.toString().length - 1);

  const setServices = new Set();
  data.forEach(row => {
    setServices.add(row.serviceName);
  });
  const services: any[] = [];
  Array.from(setServices).forEach((s, i) => {
    services.push({ name: s, color: COLORS[i % 4] });
  });
  dataLines.forEach(line => {
    services.forEach(s => {
      if (!line[s.name]) {
        line[s.name] = 0;
      }
    });
  });

  return (
    <div className='w-full h-full flex flex-col mt-6 '>
      <Form {...form}>
        <div className='flex flex-row'>
          <form className='w-fit'>
            <FormField
              control={form.control}
              name='year'
              render={({ field }) => (
                <FormItem className='flex flex-row'>
                  <FormLabel className='my-auto'>Thống kê doanh thu năm: </FormLabel>
                  <FormControl className='ml-4'>
                    <Input
                      {...field}
                      type='number'
                      className='w-20'
                      max={new Date().getFullYear()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </div>
      </Form>
      <div className='flex flex-row justify-start mt-3'>
        <Select
          onChange={e => {
            setFilter(e.target.value);
          }}
          label='Lọc'
          defaultSelectedKeys={[`all`]}
          isRequired
          size='sm'
          radius='sm'
          variant='bordered'
          disallowEmptySelection={true}
          className='w-[20rem] items-center justify-center'
        >
          {[
            <SelectItem key='all' value='all'>
              Tất cả
            </SelectItem>,
          ].concat(
            services.map(s => (
              <SelectItem key={s.name} value={s.name}>
                {s.name}
              </SelectItem>
            )),
          )}
        </Select>
      </div>
      <div className='flex flex-row w-full gap-3 mt-3'>
        <div
          className='basis-1/2 flex flex-col h-[120px] rounded-[5px] transition ease-in-out hover:scale-105'
          style={{
            backgroundImage: 'linear-gradient(to right, rgb(254, 148, 102), rgb(255, 182, 150))',
          }}
        >
          <h4 className='text-white text-[24px] mt-[10px] ms-[10px]'>{billNum}</h4>
          <div className='flex flex-row justify-between'>
            <h6
              className='text-white text-[14px] mt-[-2px] ms-[10px]'
              style={{ fontFamily: 'sans-serif' }}
            >
              Số hóa đơn
            </h6>
          </div>
          <Divider className='bg-white' />
          <h6
            className='text-white text-[14px] mt-[14px] ml-[10px]'
            style={{ fontFamily: 'sans-serif' }}
          >
            🕛 Update: {year}
          </h6>
        </div>
        <div
          className='basis-1/2 flex flex-col h-[120px] rounded-[5px] transition ease-in-out hover:scale-105'
          style={{
            backgroundImage: 'linear-gradient(to right, rgb(6, 197, 133), rgb(19, 241, 164))',
          }}
        >
          <h4 className='text-white text-[24px] mt-[10px] ml-[10px]'>{currencyFormat(sum)}</h4>
          <div className='flex flex-row justify-between'>
            <h6
              className='text-white text-[14px] mt-[-2px] ml-[10px]'
              style={{ fontFamily: 'sans-serif' }}
            >
              Tổng thu
            </h6>
          </div>
          <Divider className='bg-white' />
          <h6
            className='text-white text-[14px] mt-[14px] ml-[10px]'
            style={{ fontFamily: 'sans-serif' }}
          >
            🕛 Update: {year}
          </h6>
        </div>
      </div>
      <div className='p-3 border-1 border-gray-300 bg-slate-50 shadow-md rounded-md mb-3 mt-3'>
        <ResponsiveContainer width='100%' height={360} className='mt-8 mb-3'>
          <BarChart data={dataBar}>
            <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={true} axisLine={true} />
            <YAxis
              stroke='#888888'
              fontSize={12}
              tickLine={true}
              axisLine={true}
              tickFormatter={value => `${value}đ`}
              domain={[0, max]}
            />
            <Tooltip content={<BarChartTooltip payload={undefined} label={undefined} />} />
            <Legend />
            <Bar dataKey='Total' fill='#00C49F' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className='pb-6 text-center text-gray-600 font-medium'>
          Biểu đồ tổng doanh thu của văn phòng qua các tháng - năm {year}
        </p>
      </div>
      <div className='flex flex-row w-full gap-3'>
        <div className='md:basis-2/3 p-3 border-1 border-gray-300 bg-slate-50 shadow-md rounded-md'>
          <ResponsiveContainer width='100%' height={350} className='mt-8 mb-3 '>
            <LineChart data={dataLines}>
              <XAxis dataKey='name' />
              <YAxis />
              {services.map((s: any) => (
                <Line type='monotone' dataKey={s.name} stroke={s.color} connectNulls />
              ))}
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
          <p className='pb-6 text-center text-gray-600 font-medium'>
            Biểu đồ tăng giảm số lượng đăng ký gói dịch vụ các loại - năm {year}
          </p>
        </div>
        <div className='md:basis-1/3 p-3 border-1 border-gray-300 bg-slate-50 shadow-md rounded-md'>
          <ResponsiveContainer width='100%' height={400} className='mt-8 mb-3'>
            <PieChart>
              <Pie dataKey={'value'} data={dataPie} fill='#0000000' cx='50%' cy='50%' label>
                {dataPie.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
              {/* <Legend/> */}
            </PieChart>
          </ResponsiveContainer>
          <p className='pb-6 text-center text-gray-600 font-medium'>
            Biểu đồ độ phổ biến các loại dịch vụ - năm {year}
          </p>
        </div>
      </div>
      {/* <div className='w-full h-full'>
        <LineCharts />
      </div>

      <div className='w-full h-full'>
        <PieCharts />
      </div> */}
    </div>
  );
}
