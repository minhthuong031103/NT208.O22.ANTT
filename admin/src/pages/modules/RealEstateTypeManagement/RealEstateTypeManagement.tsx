/** @format */

import Loader from '@/components/Loader/Loader';
import { useLoaiBDS } from '@/hooks/useLoaiBDS';
import { Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ListComponent } from './ListComponent';
type li = {
  value: string;
  label: string;
};
export const RealEstateTypeManagement = () => {
  const [value, setValue] = useState(new Set([]));
  const [isLoading, setIsLoading] = useState(false);
  const [loaiBDSList, setLoaiBDSList] = useState<li[]>([]);
  const [haveData, setHaveData] = useState(false);
  const { onGetAllType } = useLoaiBDS();

  useEffect(() => {
    const getLoaiBDS = async () => {
      setIsLoading(true);
      await onGetAllType().then(res => {
        const loai: li[] = [];
        res?.map(item => {
          loai.push({
            value: item?.id,
            label: item?.name,
          });
        });
        setLoaiBDSList(loai);
        setIsLoading(false);
      });
    };
    getLoaiBDS();
  }, []);

  const handleSelectionChange = e => {
    setValue(e.target.value);
    setHaveData(true);
  };
  return (
    <div className='flex gap-6 flex-col'>
      <h1 className='mt-6 mx-2 text-xl font-medium '>Quản lý danh sách loại bất động sản</h1>
      {isLoading ? (
        <div className='w-full h-full items-center justify-center flex'>
          <Loader />
        </div>
      ) : null}
      {!isLoading && (
        <div>
          <Select
            label='Loại bất động sản'
            variant='bordered'
            placeholder='Chọn loại bất động sản'
            selectedKeys={value}
            radius='sm'
            className='max-w-xs'
            onChange={handleSelectionChange}
          >
            {loaiBDSList.map(loaibds => (
              <SelectItem key={loaibds?.value} value={loaibds.value}>
                {loaibds.label}
              </SelectItem>
            ))}
          </Select>
          {haveData && <ListComponent id={value} />}
        </div>
      )}
    </div>
  );
};
