/** @format */

import {
  Button,
  FileDialog,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageList,
} from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useModal } from '@/hooks/useModal';
import DialogCustom from '@/components/dialogCustom/dialogCustom';
import { useQueryClient } from '@tanstack/react-query';
import { useBanner } from '@/hooks/useBanners';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Axios from 'axios';

const formSchema = z.object({
  banner: z.string().min(1, {
    message: 'Yêu cầu ảnh banner',
  }),
});

export const BannersAddModal = ({ keyName, refetch }) => {
  const { onCreateBanner } = useBanner();
  const { modal, onCloseAddModal } = useModal();
  const [files, setFiles] = useState<any[]>([]);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      banner: '',
    },
  });

  const onSubmit = async () => {
    if (!files?.length) {
      toast.error('Vui lòng thêm ảnh banner cho văn phòng');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'yax7lsph');

    Axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData).then(async res => {
      setFiles([{ preview: res.data?.url }]);
      await onCreateBanner({
        formData: { srcImg: res.data?.url },
        callback: () => {
          form.reset();
          refetch();
          onCloseAddModal();
        },
      });
      await queryClient.refetchQueries({
        queryKey: [keyName],
      });
    });
  };

  return (
    <DialogCustom
      className='lg:w-[60%] h-fit pb-8'
      isModalOpen={modal.addModal}
      onClose={onCloseAddModal}
    >
      <div className='mx-auto '>
        <div className='flex flex-row w-full justify-center items-center p-8'>
          <div className='font-bold text-center'>Thêm Banner</div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex items-center justify-center flex-col'
          >
            <div className='w-[80%] lg:w-[60%] space-y-3'>
              <FormField
                name='banner'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='mr-10'>Banner</FormLabel>
                    <FormControl>
                      <FileDialog
                        setValue={field.onChange}
                        name='banner'
                        maxFiles={1}
                        maxSize={1024 * 1024 * 4}
                        files={files}
                        setFiles={setFiles as any}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {files?.length ? <ImageList files={files} height={64} width={64} /> : null}
            </div>

            <div className='flex items-center justify-center mt-10  w-full'>
              <Button
                type='submit'
                className='w-32 lg:w-[20%] h-12 border-1 border-emerald-400 bg-transparent text-emerald-400 hover:bg-emerald-400 hover:text-slate-800'
              >
                Thêm banner
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogCustom>
  );
};
