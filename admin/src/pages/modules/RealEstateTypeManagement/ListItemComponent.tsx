/** @format */

import { Button } from '@/components';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FiXCircle } from 'react-icons/fi';
import { useState } from 'react';
import { useLoaiBDS } from '@/hooks/useLoaiBDS';

export const ListItemComponent = ({ item, loaiHinhList, setLoaiHinhList }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [textModal, setTextModal] = useState('');
  const [typeActions, setTypeActions] = useState(1);
  const { onUpdateLoaiHinh } = useLoaiBDS();

  const onLocking = async () => {
    setLoaiHinhList(loaiHinhList?.map(i => (i.id === item.id ? { ...i, visible: false } : i)));
    const submitData = {
      id: item.id,
      visible: false,
    };
    await onUpdateLoaiHinh({ submitData });
  };
  const onOpening = async () => {
    setLoaiHinhList(loaiHinhList?.map(i => (i.id === item.id ? { ...i, visible: true } : i)));
    const submitData = {
      id: item.id,
      visible: true,
    };
    await onUpdateLoaiHinh({ submitData });
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Xác nhận</ModalHeader>
              <ModalBody>
                <p>{textModal}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className={`bg-transparent border-1 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white`}
                  onClick={() => {
                    onClose();
                    if (typeActions === 1) {
                      onLocking();
                    } else onOpening();
                  }}
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
      <div className='w-full p-3 bg-white border-2 border-gray-200 hover:shadow-sm transition ease-in-out hover:scale-[1.01] rounded-md flex flex-row flex-wrap justify-between'>
        <div className='flex flex-row gap-2 items-center'>
          {item.visible ? (
            <IoMdCheckmarkCircleOutline className='mt-1' />
          ) : (
            <FiXCircle className='mt-1' />
          )}
          {item.name}
        </div>
        {item.visible ? (
          <Tooltip key={item.id + `2`} color={`warning`} content={'Ẩn'} className='capitalize'>
            <Button
              onClick={() => {
                setTypeActions(1);
                setTextModal(
                  'Sau khi ẩn, đối tác không thể thấy mục này, tuy nhiên các tin dùng mục này trước đó không bị ảnh hưởng. Bạn có đồng ý không?',
                );
                onOpen();
              }}
            >
              <FiXCircle className='w-4 h-4' />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            key={item.id + `1`}
            color={'success'}
            content={'Mở'}
            className='capitalize text-white'
          >
            <Button
              onClick={() => {
                setTextModal(
                  'Sau khi mở, đối tác tạo bài có thể chọn mục này trong phần loại hình bất động sản. Bạn có đồng ý không?',
                );
                setTypeActions(2);
                onOpen();
              }}
            >
              <IoMdCheckmarkCircleOutline className='w-4 h-4' />
            </Button>
          </Tooltip>
        )}
      </div>
    </>
  );
};
