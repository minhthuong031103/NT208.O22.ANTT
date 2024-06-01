/** @format */

import { Button } from '@/components';
import DialogCustom from '@/components/dialogCustom/dialogCustom';
import { useModal } from '@/hooks/useModal';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  onConfirm: any;
  btnClass?: string;
  className?: string;
}

export const CustomerStatusConfirmationModal = (props: Props) => {
  const { modal, onCloseEditModal } = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  //   const [btnClass, setBtnClass] = useState("")

  const onSubmit = () => {
    setIsProcessing(true);
    props.onConfirm();
  };
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsProcessing(false);
    if (modal.data) {
      setTitle(modal.data?.title);
      setMessage(
        `Bạn có chắc chắn rằng muốn ${(modal.data?.title as string).toLowerCase()} ${modal.data
          ?.data.name}?`,
      );
    }
  }, [modal.editModal]);

  return (
    <DialogCustom
      className={'max-w-xl h-fit ' + props.className}
      isModalOpen={modal.editModal}
      onClose={onCloseEditModal}
      showCloseBtn={false}
    >
      <div className='py-8 w-full h-full flex flex-col'>
        <section className='ml-8'>
          <div className='flex flex-row w-full'>
            <div className='font-bold'>{title}</div>
          </div>
          <div className='text-black mt-3'>{message}</div>
        </section>

        <div className='w-full h-full items-end justify-end flex mt-5'>
          <div className=' flex flex-row  space-x-4 justify-end w-fit mr-8'>
            <div>
              <Button
                onClick={() => {
                  onSubmit();
                }}
                variant={'default'}
                className={`bg-transparent border-1 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white`}
              >
                <div className='w-full h-full z-50 flex justify-center items-center'>
                  {isProcessing ? <Loader2 className='animate-spin' /> : 'Xác nhận'}
                </div>
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  onCloseEditModal();
                }}
                variant={'outline'}
                className={'bg-slate-800 text-white hover:bg-slate-700 hover:text-white'}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isProcessing ? (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-black opacity-20 flex items-center justify-center rounded-lg'>
          {/* <Loader/> */}
        </div>
      ) : null}
    </DialogCustom>
  );
};
