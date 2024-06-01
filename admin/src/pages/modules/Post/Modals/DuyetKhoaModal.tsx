/** @format */

import DialogCustom from '@/components/dialogCustom/dialogCustom';
import { useModal } from '@/hooks/useModal';
import { AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import { Zoom } from '@/components';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from '@nextui-org/react';
import { Separator } from '@/components/ui/seperator/seperator';
import { BsCheck2 } from 'react-icons/bs';
import { formatCurrency, parseJSON } from '@/lib/utils';
import { usePosts } from '@/hooks/usePosts';
import { useState } from 'react';

function DuyetKhoaModal({ data, refetch, refetch2 }) {
  const { modal, onCloseEditModal } = useModal();
  const { onUpdatePost } = usePosts();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [textModal, setTextModal] = useState('');
  const [typeActions, setTypeActions] = useState(1);

  const onVerifyActions = () => {
    onOpen();
  };

  const onAgreeing = async () => {
    const formData = {
      id: data?.id,
      trangThai: 'da_duyet',
    };
    await onUpdatePost({
      formData,
      callback: () => {
        refetch();
        refetch2();
        onCloseEditModal();
      },
    });
  };

  const onDenying = async () => {
    const formData = {
      id: data?.id,
      trangThai: 'khong_duyet',
    };
    await onUpdatePost({
      formData,
      callback: () => {
        refetch();
        refetch2();
        onCloseEditModal();
      },
    });
  };

  const onLocking = async () => {
    const formData = {
      id: data?.id,
      trangThai: 'da_khoa',
    };
    await onUpdatePost({
      formData,
      callback: () => {
        refetch();
        refetch2();
        onCloseEditModal();
      },
    });
  };
  if (!data) return null;
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
                      onAgreeing();
                    } else if (typeActions === 2) {
                      onDenying();
                    } else onLocking();
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
      <DialogCustom className='lg:w-[90%]' isModalOpen={modal.editModal} onClose={onCloseEditModal}>
        <div className='mx-auto'>
          <div className='flex flex-col w-full justify-center items-center'>
            <div className='font-medium text-center text-[28px] mb-6 mt-4'>Thông tin bài đăng</div>
            <div className='w-full bg-slate-50 rounded-md'>
              <div className='container'>
                <div className='ml-0'>
                  <div className='pt-[48px]'>
                    <div className='flex flex-col lg:flex-row justify-between mb-8'>
                      <div className='w-[60%]'>
                        <h1 className='text-[28px] text-neutral-700 font-medium '>
                          {data?.tieuDe}
                        </h1>
                        <h4 className='text-gray-500'>{data?.diaChi}</h4>
                      </div>
                      <div className='text-[28px] text-neutral-700 font-medium my-auto flex flex-row lg:w-[40%] lg:justify-end w-full justify-between space-x-6'>
                        <p>
                          {formatCurrency(data?.gia)}
                          {data?.isChothue === true ? (
                            <p className='text-[24px] font-normal'> /Tháng</p>
                          ) : (
                            <></>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='rounded-md bg-white shadow p-12 border-[1px] mb-8'>
                      <div className='text-gray-600 font-semibold mb-8'>Hình ảnh bất động sản</div>
                      <div className='flex flex-row flex-wrap gap-2'>
                        {parseJSON(data?.hinhAnhSanPham)?.map(item => (
                          <Zoom className='w-[360px] h-[240px]'>
                            <div className='w-[360px] h-[240px] overflow-hidden rounded-md'>
                              <img
                                className='w-full h-full'
                                style={{ objectFit: 'cover' }}
                                src={item?.url}
                              />
                            </div>
                          </Zoom>
                        ))}
                      </div>
                    </div>
                    <div className='rounded-md bg-white shadow p-12 border-[1px]'>
                      <div className='text-gray-600 font-semibold mb-8'>Giấy tờ pháp lý</div>
                      <div className='flex flex-row flex-wrap gap-2'>
                        {parseJSON(data?.hinhAnhGiayTo)?.map(item => (
                          <Zoom className='w-[360px] h-[240px]'>
                            <div className='w-[360px] h-[240px] overflow-hidden rounded-md'>
                              <img
                                className='w-full h-full'
                                style={{ objectFit: 'cover' }}
                                src={item?.url}
                              />
                            </div>
                          </Zoom>
                        ))}
                      </div>
                    </div>
                    <div className='flex flex-col lg:flex-row lg:gap-6'>
                      <div className='basis-3/4'>
                        <div className='mt-8 w-full rounded-md bg-white border-[1px] shadow p-8'>
                          <div className='flex flex-row flex-wrap gap-4'>
                            <div className='rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8'>
                              {data?.isChothue === false ? 'Đăng bán' : 'Cho thuê'}
                            </div>
                            <div className='rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8'>
                              {data?.loaiHinh?.name}
                            </div>
                            {data?.loaiHinh?.loaiBDS?.name === 'Căn hộ' ||
                            data?.loaiHinh?.loaiBDS?.name === 'Nhà ở' ? (
                              <>
                                <div className='rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8'>
                                  Nhà tắm: {data?.soPhongTam}
                                </div>
                                <div className='rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8'>
                                  Phòng ngủ: {data?.soPhongNgu}
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            <div className='rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8'>
                              Diện tích: {data?.dienTich} m<sup>2</sup>
                            </div>
                          </div>
                          <div className='mt-8 text-gray-600'>Mô tả</div>
                          <div className='mt-4 text-gray-600 text-[14px]'>{data?.moTa}</div>
                          <Separator className='mt-4' />
                          <div className='mt-8 text-gray-600'>Thông tin chi tiết</div>
                          <div className='mt-4 lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600 text-[14px]'>
                            <div className='flex flex-row'>
                              <div className='w-1/2'>BDS ID:</div>
                              <div className='w-1/2 font-semibold'>{data?.id}</div>
                            </div>
                            <div className='flex flex-row'>
                              <div className='w-1/2'>Chiều dài:</div>
                              <div className='w-1/2 font-semibold'>{data?.chieuDai} m</div>
                            </div>
                            <div className='flex flex-row'>
                              <div className='w-1/2'>Chiều rộng:</div>
                              <div className='w-1/2 font-semibold'>{data?.chieuRong} m</div>
                            </div>
                            <div className='flex flex-row'>
                              <div className='w-1/2'>Diện tích:</div>
                              <div className='w-1/2 font-semibold'>
                                {data?.dienTich} m<sup>2</sup>
                              </div>
                            </div>
                            {data?.loaiHinh?.loaiBDS?.name !== 'Đất' ? (
                              <>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Năm hoàn thành:</div>
                                  <div className='w-1/2 font-semibold'>
                                    {
                                      new Date(data?.hoanThanh)
                                        .toLocaleDateString('en-GB')
                                        .split('/')[2]
                                    }
                                  </div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Sửa chữa lần cuối:</div>
                                  <div className='w-1/2 font-semibold'>
                                    {
                                      new Date(data?.suaChuaLanCuoi)
                                        .toLocaleDateString('en-GB')
                                        .split('/')[2]
                                    }
                                  </div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Nội thất:</div>
                                  <div className='w-1/2 font-semibold'>
                                    {data?.tinhTrangNoiThat}
                                  </div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Hướng cửa chính:</div>
                                  <div className='w-1/2 font-semibold'>{data?.huongCuaChinh}</div>
                                </div>
                              </>
                            ) : (
                              <div className='flex flex-row'>
                                <div className='w-1/2'>Hướng đất:</div>
                                <div className='w-1/2 font-semibold'>{data?.huongDat}</div>
                              </div>
                            )}
                            {data?.loaiHinh?.loaiBDS?.name === 'Căn hộ' ? (
                              <>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Hướng ban công:</div>
                                  <div className='w-1/2 font-semibold'>{data?.huongBanCong}</div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Số tầng:</div>
                                  <div className='w-1/2 font-semibold'>{data?.soTang}</div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Phòng tắm:</div>
                                  <div className='w-1/2 font-semibold'>{data?.soPhongTam}</div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Phòng ngủ:</div>
                                  <div className='w-1/2 font-semibold'>{data?.soPhongNgu}</div>
                                </div>
                              </>
                            ) : data?.loaiHinh?.loaiBDS?.name === 'Nhà ở' ? (
                              <>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Phòng tắm:</div>
                                  <div className='w-1/2 font-semibold'>{data?.soPhongTam}</div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Phòng ngủ:</div>
                                  <div className='w-1/2 font-semibold'>{data?.soPhongNgu}</div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Nhà kho:</div>
                                  <div className='w-1/2 font-semibold'>
                                    {data?.coNhaKho === true ? 'Có' : 'Không'}
                                  </div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Garage:</div>
                                  <div className='w-1/2 font-semibold'>
                                    {data?.dienTichGarage} m<sup>2</sup>
                                  </div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>Hồ bơi:</div>
                                  <div className='w-1/2 font-semibold'>
                                    {data?.dienTichHoBoi} m<sup>2</sup>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            <div className='flex flex-row'>
                              <div className='w-1/2'>Tình trạng pháp lý:</div>
                              <div className='w-1/2 font-semibold'>{data?.tinhTrangPhapLy}</div>
                            </div>
                          </div>
                        </div>
                        {data?.loaiHinh?.loaiBDS?.name !== 'Đất' ? (
                          <div className='mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8'>
                            <div className='text-gray-600 font-semibold'>Tiện nghi</div>
                            <div className='mt-4 lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600 text-[14px]'>
                              {parseJSON(data?.danhSachTienNghi).map(item => (
                                <div className='flex flex-row'>
                                  <BsCheck2 className='text-blue-500 w-[24px] h-[24px] mr-4' />
                                  <div className='w-1/2'>{item}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className='mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8'>
                          <div className='flex flex-row justify-between flex-wrap'>
                            <div className='text-gray-600 font-semibold'>Bản vẽ nhà</div>
                          </div>
                          <img
                            src={parseJSON(data?.hinhAnhBanVeThietKe)[0]?.url}
                            className='mt-8 w-full rounded-md h-[360px] md:h-[540px] lg:h-[630px]'
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className='mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8'>
                          <div className='flex flex-row justify-between flex-wrap'>
                            <div className='text-gray-600 font-semibold'>Video</div>
                          </div>
                          {/* <img
                src="https://thamtuphuctam.com/wp-content/uploads/2019/01/dich-vu-tham-tu-thanh-hoa-min.jpg"
                className="mt-8 w-full rounded-md"
                style={{ objectFit: "cover" }}
              /> */}
                          <iframe
                            className='mt-8 rounded-md w-full h-[270px] md:h-[450px] lg:h-[540px]'
                            style={{ objectFit: 'cover' }}
                            src={data?.video}
                          ></iframe>
                        </div>
                      </div>
                      <div className='basis-1/4 h-fit lg:mt-8 mt-0 mb-8'>
                        <div className='lg:basis-1/4 h-[380px] sm:h-[380px] lg:h-full rounded-md bg-white border-[1px] shadow p-6'>
                          <div className='font-semibold text-[24px]'>Đăng bởi</div>
                          <div className='flex flex-row lg:flex-col gap-4 mt-4'>
                            <img
                              src={data?.user.avatar}
                              className='rounded-md h-[180px] w-[180px] lg:w-[90px] lg:h-[90px]'
                            />
                            <div>
                              <div className='font-semibold text-[16px] mt-4'>
                                {data?.user.name}
                              </div>
                              <div className='text-[14px] mt-2 overflow-hidden'>
                                <div className='flex flex-row gap-2'>
                                  <AiOutlinePhone className='py-auto' />
                                  {data?.user.phoneNumber}
                                </div>
                                <div className='flex flex-row gap-2'>
                                  <HiOutlineMail />
                                  {data?.user.email}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-row gap-2 text-[14px] mt-1 text-gray-400'>
                            <IoLocationOutline className='text-[24px]' />
                            {data?.user.diaChi}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='h-[100px]'></div>
            <div className='fixed bottom-0 w-full bg-white p-8'>
              <div className='flex justify-center gap-8'>
                {data?.trangThai === 'cho_duyet' ? (
                  <>
                    <Button
                      className='bg-transparent border-1 border-emerald-500 text-emerald-500 transition ease-in-out duration-300 active:scale-80 hover:bg-emerald-500 hover:text-white'
                      radius='sm'
                      onClick={() => {
                        setTextModal('Bạn có chắc chắn muốn duyệt bài đăng này ?');
                        onVerifyActions();
                        setTypeActions(1);
                      }}
                    >
                      Duyệt bài
                    </Button>
                    <Button
                      className='bg-slate-800 text-white transition ease-in-out duration-300 active:scale-80 hover:bg-slate-700'
                      radius='sm'
                      onClick={() => {
                        setTextModal('Bạn có chắc chắn muốn từ chối duyệt bài đăng này ?');
                        onVerifyActions();
                        setTypeActions(2);
                      }}
                    >
                      Từ chối duyệt bài
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className='bg-transparent border-1 border-red-500 text-red-500 transition ease-in-out duration-300 active:scale-80 hover:bg-red-500 hover:text-white'
                      radius='sm'
                      onClick={() => {
                        setTextModal('Bạn có chắc chắn muốn khóa bài đăng này ?');
                        onVerifyActions();
                        setTypeActions(3);
                      }}
                    >
                      Khóa bài
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogCustom>
    </>
  );
}

export default DuyetKhoaModal;
