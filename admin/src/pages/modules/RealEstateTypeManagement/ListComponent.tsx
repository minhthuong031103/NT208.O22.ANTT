/** @format */

import { useLoaiBDS } from '@/hooks/useLoaiBDS';
import { Button, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ListItemComponent } from './ListItemComponent';
import { FaPlus } from 'react-icons/fa6';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { toast } from 'react-hot-toast';

type li = {
  id: number;
  name: string;
  loaiBDSId: number;
  visible: boolean;
};

export const ListComponent = ({ id }) => {
  const [loaiHinhList, setLoaiHinhList] = useState<li[]>([]);
  const { onGetAllTypeChildById, onCreateLoaiHinh } = useLoaiBDS();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [textAdd, setTextAdd] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLoaiHinh = async () => {
      await onGetAllTypeChildById(id).then(res => {
        setLoaiHinhList(res);
      });
    };
    getLoaiHinh();
    setTextAdd('');
  }, [id]);

  const onSubmit = async onClose => {
    if (textAdd === '') {
      toast.error('Tên danh mục đang bị trống, không thể thêm');
      return;
    }
    setIsLoading(true);
    const submitData = {
      name: textAdd,
      loaiBDSId: parseInt(id),
    };
    await onCreateLoaiHinh({ submitData }).then(res => {
      setLoaiHinhList([
        ...loaiHinhList,
        {
          id: res.id,
          name: textAdd,
          visible: true,
          loaiBDSId: id,
        },
      ]);
      setTextAdd('');
      setIsLoading(false);
      onClose();
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Xác nhận</ModalHeader>
              <ModalBody>
                <p>{`Bạn có chắc chắn muốn thêm ${textAdd} vào danh sách danh mục không? Sau khi thêm không thể sửa và xóa mà chỉ có thể ẩn.`}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className={`bg-transparent border-1 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white`}
                  onClick={() => {
                    onSubmit(onClose);
                  }}
                  isLoading={isLoading}
                  spinner={
                    <svg
                      className='animate-spin h-5 w-5 text-current'
                      fill='none'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        fill='currentColor'
                      />
                    </svg>
                  }
                >
                  Xác nhận
                </Button>
                <Button
                  className={'bg-slate-800 text-white hover:bg-slate-700 hover:text-white'}
                  onClick={onClose}
                >
                  Hủy
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div>
        <div className='flex flex-row flex-wrap gap-3 justify-between align-bottom mt-3'>
          <Input
            isRequired
            type='email'
            label='Tên loại hình'
            placeholder='Nhập tên loại hình cần thêm'
            radius='sm'
            variant='bordered'
            className='max-w-xs'
            onChange={e => setTextAdd(e.target.value)}
          />
          <Button
            className='bg-transparent border-1 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
            radius='sm'
            onClick={onOpen}
            startContent={<FaPlus />}
          >
            Thêm
          </Button>
        </div>
        <div className='bg-slate-50 mt-2 flex flex-col gap-3'>
          {loaiHinhList?.map(item => (
            <ListItemComponent
              key={item.id}
              item={item}
              loaiHinhList={loaiHinhList}
              setLoaiHinhList={setLoaiHinhList}
            />
          ))}
        </div>
      </div>
    </>
  );
};
