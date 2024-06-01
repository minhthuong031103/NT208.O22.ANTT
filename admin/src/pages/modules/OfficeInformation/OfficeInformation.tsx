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
  Label,
} from '@/components';
import { Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import EditorCustom from '@/components/editorCus/EditorCustom';
import { useOffice } from '@/hooks/useOffice';
import { Separator } from '@/components/ui/seperator';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsVectorPen } from 'react-icons/bs';
import { TbBallpenOff } from 'react-icons/tb';
import Axios from 'axios';
import { isNumber } from '@/lib/utils';
import Loader from '@/components/Loader/Loader';

const formSchema = z.object({
  nameOffice: z.string().min(1, {
    message: 'Yêu cầu tên văn phòng',
  }),
  email: z.string().min(1, {
    message: '',
  }),
  password: z.string().min(6, {
    message: 'Yêu cầu mật khẩu',
  }),
  logo: z.string().min(1, {
    message: 'Yêu cầu logo',
  }),
  aboutUs: z.string().min(1, {
    message: 'Yêu cầu giới thiệu',
  }),
  policy: z.string().min(1, {
    message: 'Yêu cầu chính sách',
  }),
  address: z.string().min(1, {
    message: 'Yêu cầu địa chỉ',
  }),
  phoneNumber: z.string().min(1, {
    message: 'Yêu cầu số điện thoại liên hệ',
  }),
  anhGiayPhep: z.string().min(1, {
    message: 'Yêu cầu hình ảnh giấy phép',
  }),
});

export const OfficeInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onGetOffice, onUpdateOffice } = useOffice();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState();
  const [contentValue, setContentValue] = useState('');
  // eslint-disable-next-line prefer-const
  // eslint-disable-next-line prefer-const
  let [urlInitLicense, setUrlInitLicense] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileGiayPheps, setFileGiayPheps] = useState<any[]>([{ preview: `` }]);
  const [isUploadingGiayPhep, setIsUploadingGiayPhep] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameOffice: '',
      email: '',
      password: '',
      aboutUs: '',
      policy: '',
      address: '',
      phoneNumber: '',
      anhGiayPhep: '',
    },
  });
  const getOfficeInformation = async () => {
    await onGetOffice().then(result => {
      setData(result);
      setUrlInitLicense(result?.anhGiayPhep);
      setFileGiayPheps([{ preview: `${result?.anhGiayPhep}` }]);
      setContentValue(result?.policy);
      form.setValue('nameOffice', result?.nameOffice);
      form.setValue('email', result?.email);
      form.setValue('password', result?.password);
      form.setValue('aboutUs', result?.aboutUs);
      form.setValue('policy', result?.policy);
      form.setValue('address', result?.address);
      form.setValue('phoneNumber', result?.phoneNumber);
      form.setValue('anhGiayPhep', result?.anhGiayPhep);
    });
  };
  useEffect(() => {
    getOfficeInformation();
  }, []);

  useEffect(() => {
    getOfficeInformation();
  }, [isEditing]);

  const onSubmit = async val => {
    if (!isNumber(val.phoneNumber)) {
      toast.error('Số điện thoại không hợp lệ, vui lòng nhập lại');
      return;
    }
    if (!contentValue) {
      toast.error('Vui lòng bổ sung chính sách văn phòng');
      return;
    }
    if (!fileGiayPheps?.length) {
      toast.error('Vui lòng thêm ảnh giấy phép hành nghề');
      return;
    }

    const submit = async () => {
      const submitData = {
        id: data?.id,
        nameOffice: val.nameOffice,
        email: val.email,
        password: val.password,
        aboutUs: val.aboutUs,
        policy: contentValue,
        address: val.address,
        phoneNumber: val.phoneNumber,
        anhGiayPhep: urlInitLicense,
      };
      await onUpdateOffice({ submitData }).then(() => {
        setIsEditing(false);
        setIsLoading(false);
      });
    };

    //push submit block above to call in this block
    const checkLicense = () => {
      if (urlInitLicense !== fileGiayPheps[0]?.preview) {
        const formData = new FormData();
        formData.append('file', fileGiayPheps[0]);
        formData.append('upload_preset', 'yax7lsph');

        setIsUploadingGiayPhep(true);
        Axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData).then(res => {
          urlInitLicense = res.data?.url;
          setUrlInitLicense(res.data?.url);
          setFileGiayPheps([{ preview: res.data?.url }]);
          submit();
        });
      } else submit();
    };

    // push 2 function before this block to call in this block
    setIsLoading(true);
    checkLicense();
  };
  if (!data) return null;
  return (
    <div className='mx-auto mt-6 mb-6'>
      <div className='flex flex-row w-full justify-center items-center'>
        <div className='font-medium text-center text-xl text-slate-800'>Thông tin văn phòng</div>
      </div>
      <div className='w-[90%] flex flex-row justify-end items-end'>
        <Button onClick={() => setIsEditing(prev => !prev)}>
          {isEditing ? (
            <TbBallpenOff className='mt-1 mr-1' />
          ) : (
            <BsVectorPen className='mt-1 mr-1' />
          )}{' '}
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex items-center justify-center flex-col'
        >
          <div className='w-[80%] space-y-6'>
            <FormField
              control={form.control}
              name='nameOffice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên văn phòng</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={data?.nameOffice}
                      variant='bordered'
                      radius={'sm'}
                      size={'lg'}
                      placeholder='Tên văn phòng'
                      isDisabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='aboutUs'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới thiệu</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={data?.aboutUs}
                      variant='bordered'
                      radius={'sm'}
                      size={'lg'}
                      placeholder='Giới thiệu văn phòng'
                      isDisabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name='email'
              render={() => (
                <FormItem>
                  <FormLabel>Email liên hệ</FormLabel>
                  <FormControl>
                    <Input
                      isReadOnly
                      type='email'
                      variant='bordered'
                      radius={'sm'}
                      size={'lg'}
                      disabled
                      defaultValue={data?.email}
                      placeholder='Email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      isReadOnly
                      variant='bordered'
                      radius={'sm'}
                      size={'lg'}
                      defaultValue={data?.password}
                      placeholder='Mật khẩu'
                      endContent={
                        <button
                          className='focus:outline-none transition ease-in-out duration-300 hover:scale-110 active:scale-80'
                          type='button'
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <AiFillEyeInvisible className='text-2xl text-default-400 pointer-events-none' />
                          ) : (
                            <AiFillEye className='text-2xl text-default-400 pointer-events-none' />
                          )}
                        </button>
                      }
                      type={isVisible ? 'text' : 'password'}
                      isDisabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={data?.address}
                      variant='bordered'
                      radius={'sm'}
                      size={'lg'}
                      placeholder='Địa chỉ văn phòng'
                      isDisabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={data?.phoneNumber}
                      variant='bordered'
                      radius={'sm'}
                      size={'lg'}
                      placeholder='Điện thoại'
                      isDisabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
          </div>

          <section className=' w-[80%] mt-20 flex flex-col space-y-6'>
            <FormLabel className='text-xl text-slate-800'>Thông tin pháp lý</FormLabel>
            <FormField
              name='anhGiayPhep'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mr-10'>Hình ảnh giấy phép hành nghề</FormLabel>
                  <FormControl>
                    <FileDialog
                      setValue={field.onChange}
                      name='anhGiayPhep'
                      maxFiles={1}
                      maxSize={1024 * 1024 * 4}
                      files={fileGiayPheps}
                      setFiles={setFileGiayPheps as any}
                      isUploading={isUploadingGiayPhep}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fileGiayPheps?.length ? (
              <ImageList files={fileGiayPheps} height={64} width={64} />
            ) : null}
            <Label>Chính sách văn phòng</Label>
            <EditorCustom
              contentValue={contentValue}
              data={data?.policy}
              setContentValue={setContentValue}
              disabled={!isEditing}
            />
          </section>
          <div className='flex items-center justify-center w-full mt-2'>
            {isEditing ? (
              <Button
                type='submit'
                className='w-[50%] bg-emerald-400 text-white transistion ease-in-out hover:scale-105 hover:bg-emerald-500'
              >
                Lưu thay đổi
              </Button>
            ) : (
              <></>
            )}
          </div>
        </form>
      </Form>
      {isLoading ? (
        <div className='w-full h-full items-center justify-center flex'>
          <Loader />
        </div>
      ) : null}
    </div>
  );
};
