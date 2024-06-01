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
  Input,
  Zoom,
} from '@/components';
import { useModal } from '@/hooks/useModal';
import DialogCustom from '@/components/dialogCustom/dialogCustom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Image } from '@nextui-org/react';

export function CustomerAddModal({data}) {
  const { modal, onCloseAddModal } = useModal();

  console.log(data);
  const form = useForm({
    defaultValues: {
      name: data?.userName,
    },
  }
  );
  // const [contentValue, setContentValue] = useState('');
  const [userImg, setUserImg] = useState<Array<any>>([]);
  const [partnerImg, setPartnerImg] = useState<Array<any>>([]);
  const [idCardFront, setIdCardFront] = useState<Array<any>>([]);
  const [idCardBack, setIdCardBack] = useState<Array<any>>([]);
  const [imgLicense, setImgLicense] = useState<Array<any>>([]);

  async function onSubmit(data) {
    console.log(data);
  }

  const watchIsPartner = form.watch('isPartner', false);

  return (
    <DialogCustom className='lg:w-[90%]' isModalOpen={modal.addModal} onClose={onCloseAddModal}>
      <div className='mx-auto '>
        <div className='flex flex-row w-full justify-center items-center'>
          <div className='font-bold text-center'>
            Add customer
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex items-center justify-center flex-col'
          >
            <div className='w-[80%] lg:w-[60%] space-y-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter user name' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='userImg'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=''>Anh dai dien</FormLabel>

                    <FormControl>
                      <FileDialog
                        setValue={field.onChange}
                        name='images'
                        maxFiles={1}
                        maxSize={1024 * 1024 * 4}
                        files={userImg}
                        setFiles={setUserImg as any}
                        // isUploading={isUploading}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=''>
                {userImg?.length ? (
                  <Zoom>
                    <Image src={userImg[0].preview} width='240' height='240' />
                  </Zoom>
                ) : null}
              </div>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='idCardNumer'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>idCardNumber</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isPartner'
                render={({ field }) => (
                  <FormItem className='flex'>
                    <FormLabel className=''>isPartner</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('isPartner')}
                        className='h-5 w-5 mx-8 my-0'
                        type='checkbox'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchIsPartner ? (
                <div>
                  <FormField
                    name='portraitPartnerImage'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=''>portraitPartnerImage</FormLabel>

                        <FormControl>
                          <FileDialog
                            setValue={field.onChange}
                            name='portraitPartnerImage'
                            maxFiles={1}
                            maxSize={2048 * 2048 * 4}
                            files={partnerImg}
                            setFiles={setPartnerImg as any}
                            // isUploading={isUploading}
                            disabled={false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {partnerImg?.length ? (
                    <Zoom>
                      <Image src={partnerImg[0].preview} width='240' height='240' />
                    </Zoom>
                  ) : null}
                </div>
              ) : null}

              <FormField
                name='frontImageIdCard'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=''>frontImageIdCard</FormLabel>

                    <FormControl>
                      <FileDialog
                        setValue={field.onChange}
                        name='frontImageIdCard'
                        maxFiles={1}
                        maxSize={2048 * 2048 * 4}
                        files={idCardFront}
                        setFiles={setIdCardFront as any}
                        // isUploading={isUploading}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {idCardFront?.length ? (
                <Zoom>
                  <Image src={idCardFront[0].preview} width='240' height='240' />
                </Zoom>
              ) : null}

              <FormField
                name='backImageIdCard'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=''>backImageIdCard</FormLabel>

                    <FormControl>
                      <FileDialog
                        setValue={field.onChange}
                        name='backImageIdCard'
                        maxFiles={1}
                        maxSize={2048 * 2048 * 4}
                        files={idCardBack}
                        setFiles={setIdCardBack as any}
                        // isUploading={isUploading}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {idCardBack?.length ? (
                <Zoom>
                  <Image src={idCardBack[0].preview} width='240' height='240' />
                </Zoom>
              ) : null}

              <FormField
                name='businessLicenseImage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=''>businessLicenseImage</FormLabel>

                    <FormControl>
                      <FileDialog
                        setValue={field.onChange}
                        name='businessLicenseImage'
                        maxFiles={1}
                        maxSize={2048 * 2048 * 4}
                        files={imgLicense}
                        setFiles={setImgLicense as any}
                        // isUploading={isUploading}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imgLicense?.length ? (
                <Zoom>
                  <Image src={imgLicense[0].preview} width='240' height='240' />
                </Zoom>
              ) : null}
              <FormField
                control={form.control}
                name='timePostNormal_Pro_VIP'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>timePostNormal_Pro_VIP</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name='stateAccount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>stateAccount</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>

            {/* <section className=' mt-20 flex flex-col space-y-6'>
              <Label>Content</Label>

              <EditorCustom contentValue={contentValue} setContentValue={setContentValue} />
            </section> */}
            <div className='flex items-center justify-center mt-10  w-full'>
              <Button type='submit' className='w-full lg:w-[20%] '>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogCustom>
  );
}
