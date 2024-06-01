/** @format */

import { Button } from '@/components';
import DialogCustom from '@/components/dialogCustom/dialogCustom';
import { useBanner } from '@/hooks/useBanners';
import { useModal } from '@/hooks/useModal';
import { ESetting } from '@/types/app';
import { useQueryClient } from '@tanstack/react-query';

export const BannersDeleteModal = () => {
  const queryClient = useQueryClient();
  const { modal, onCloseDeleteModal } = useModal();
  const { onDeleteBanner } = useBanner();

  const onSubmit = () => {
    onDeleteBanner({
      id: modal.id,
      callback: async () => {
        await queryClient.refetchQueries({ queryKey: [ESetting.banners] });
        onCloseDeleteModal();
      },
    });
  };
  return (
    <DialogCustom
      className='h-fit max-w-xl'
      isModalOpen={modal.deleteModal}
      onClose={onCloseDeleteModal}
    >
      <div className='py-8 w-full h-full flex flex-col'>
        <section className='ml-6'>
          <div className='flex flex-row w-full'>
            <div className='font-bold text-start'>Xóa Banner số {modal.id}</div>
          </div>
          <div className='text-black font-medium text-start mt-3'>
            Bạn có chắc chắn rằng muốn xóa banner này?
          </div>
        </section>

        <div className='w-full h-full items-end justify-center flex '>
          <div className=' flex flex-row mt-5 space-x-5 items-center w-fit'>
            <Button
              onClick={() => {
                onSubmit();
              }}
              className={`bg-transparent border-1 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white`}
            >
              Xác nhận
            </Button>
            <Button
              onClick={() => {
                onCloseDeleteModal();
              }}
              className={'bg-slate-800 text-white hover:bg-slate-700 hover:text-white'}
            >
              Hủy
            </Button>
          </div>
        </div>
      </div>
    </DialogCustom>
  );
};
