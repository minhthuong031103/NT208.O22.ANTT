/** @format */

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserState } from '@/context';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export default function LoginForm({ className }: { className?: string }) {
  const { onLogin } = useAuth();
  const { isAuth } = useUserState();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(isAuth);
    onLogin({
      formData: values,
      callback: () => {
        navigate('/post');
      },
    });
  }

  return (
    <div className='relative'>
      <img
        src='https://cutewallpaper.org/34/estate-house-wallpaper/676823207.jpg'
        className='h-screen w-full z-0'
        alt={''}
        style={{ objectFit: 'cover' }}
      />
      <div className='absolute w-full h-full top-0 left-0  bg-neutral-950 opacity-50 '></div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 w-full h-full flex flex-col items-center justify-center z-10 absolute top-0 left-0'
        >
          <div className='w-fit p-3 bg-[#ffffff36] rounded-md mt-6'>
            <div className='h-fit w-fit rounded-md bg-white border-[1px] shadow-sm p-8 space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        label='Email'
                        variant='bordered'
                        className='w-[270px]'
                        {...field}
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        label='Mật khẩu'
                        variant='bordered'
                        className='w-[270px] '
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-[270px]  bg-red-400' type='submit'>
                Đăng nhập
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
