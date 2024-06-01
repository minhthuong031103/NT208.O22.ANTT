'use client';

import { Button } from '@/components/ui/button';
import DialogCustom from '@/components/ui/dialogCustom';
import { MuaLeConst } from '@/lib/constant';
import { getRequest, postRequest } from '@/lib/fetch';
import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';
import Loader from '@/components/Loader';
import { Input } from '@/components/ui/input';
import { CommonSvg } from '@/assets/CommonSvg';
import { currencyFormat } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/hooks/useAuth';
import {
  useAddress,
  ConnectWallet,
  useContract,
  useContractWrite,
} from '@thirdweb-dev/react';
import { muaLeAction } from '../../../../actions/mualeaction';
import { BinanceTestnet } from '@thirdweb-dev/chains';
import { tokenAddress, receiver } from '@/constants';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDoiTac } from '@/hooks/useDoiTac';
import { useQuery } from '@tanstack/react-query';
interface MuaLeModalProps {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  callback: () => void;
  isChild?: boolean;
}
export const MuaLeBlockChainModal = ({
  setIsModalOpen,
  isModalOpen,
  callback,
  isChild,
}: MuaLeModalProps) => {
  const { contract } = useContract(tokenAddress);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    'transfer'
  );
  const router = useRouter();
  const [selectedType, setSelectedType] = React.useState(new Set([]));
  const [typeTouched, setTypeTouched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const session = useSession();
  const address = useAddress();
  const { fetchDoiTacTheoId } = useDoiTac();
  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ['userInfo', session?.data?.user?.id],
    queryFn: async () => {
      const res = await fetchDoiTacTheoId(session?.data?.user?.id);
      return res?.[0];
    },
  });

  const currentPrice = MuaLeConst?.find(
    (item) => item.value === selectedType?.values().next().value
  )?.price;
  const mthNeed =
    (currentPrice * quantity -
      (currentPrice * quantity * user?.giamGia) / 100) /
    1000;

  const onSubmit = async () => {
    setLoading(true);
    const phapLyValueArray = Array.from(selectedType);
    let luot = null;
    let luotChuyenNghiep = null;
    let luotVip = null;
    if (phapLyValueArray?.[0] === MuaLeConst[0].value) {
      luot = quantity;
    }
    if (phapLyValueArray?.[0] === MuaLeConst[1].value) {
      luotChuyenNghiep = quantity;
    }
    if (phapLyValueArray?.[0] === MuaLeConst[2].value) {
      luotVip = quantity;
    }
    console.log('🚀 ~ currentPrice:', currentPrice);

    const tx = await mutateAsync({
      args: [receiver, ethers.utils.parseEther(mthNeed.toString())],
    });
    console.log('🚀 ~ onSubmit ~ tx:', tx);
    if (tx) {
      try {
        await muaLeAction({
          userId: session?.data?.user?.id,
          luot,
          luotChuyenNghiep,
          luotVip,
          type: phapLyValueArray?.[0],
          amount:
            currentPrice * quantity -
            (currentPrice * quantity * user?.giamGia) / 100,
        });
        toast.success('Mua lẻ thành công');
        router.refresh();
      } catch (e) {
        console.log(e);
      }
    }
    //     const checkoutSession = await postRequest({
    //       endPoint: '/api/stripe/checkout-session/mua-le',
    //       formData: {
    //         userId: session?.data?.user?.id,
    //         type: phapLyValueArray?.[0],
    //         amount:
    //           currentPrice * quantity -
    //           (currentPrice * quantity * user?.giamGia) / 100,
    //         luot,
    //         luotChuyenNghiep,
    //         luotVip,
    //       },
    //       isFormData: false,
    //     });

    //     setClientSecret(checkoutSession?.clientSecret);
    setLoading(false);
  };
  const isTypeValid = selectedType.size > 0;

  return (
    <div className="w-full h-full px-1 ">
      <DialogCustom
        isChild={isChild}
        className="w-[80%] lg:w-[40%] h-[65%] lg:h-[60%] flex items-center justify-center "
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        warningOnClose={false}
        callBack={() => {}}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : !address ? (
          <ConnectWallet
            displayBalanceToken={{
              [BinanceTestnet.chainId]: tokenAddress,
            }}
          />
        ) : (
          <div className="flex flex-col justify-between gap-y-6 h-full px-1">
            <ConnectWallet
              displayBalanceToken={{
                [BinanceTestnet.chainId]: tokenAddress,
              }}
            />
            <Select
              key={'sanpham'}
              radius={'sm'}
              variant="bordered"
              label="Sản phẩm"
              isInvalid={isTypeValid || !typeTouched ? false : true}
              errorMessage={
                isTypeValid || !typeTouched ? '' : 'Vui lòng chọn sản phẩm'
              }
              autoFocus={false}
              placeholder="Chọn sản phẩm"
              selectedKeys={selectedType}
              onSelectionChange={(keys) => {
                setSelectedType(keys);
                setQuantity(1);
              }}
              onClose={() => setTypeTouched(true)}
              className="max-full"
            >
              {MuaLeConst?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.value.toString()}
                </SelectItem>
              ))}
            </Select>
            <div>
              {user?.giamGia && user.giamGia > 0 ? (
                <div className="flex flex-row gap-x-2">
                  Bạn được giảm giá{' '}
                  <p className="font-bold ">{user.giamGia}%</p> khi mua lẻ
                </div>
              ) : null}
            </div>

            {isTypeValid && (
              <>
                <Label>
                  <div className="flex flex-row gap-x-3">
                    <div className="font-semibold">Giá:</div>
                    {user?.giamGia && user.giamGia > 0 ? (
                      <>
                        <div className="line-through">
                          {currencyFormat(currentPrice)}
                        </div>
                        <div>
                          {currencyFormat(
                            currentPrice - (currentPrice * user?.giamGia) / 100
                          )}
                        </div>
                      </>
                    ) : (
                      currentPrice
                    )}
                  </div>
                </Label>
                <div className="flex gap-1 flex-row items-center">
                  <div className="font-semibold">Số lượng:</div>

                  <div className="flex items-center  justify-center">
                    <Button
                      id={`decrement`}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => {
                        setQuantity(quantity - 1);
                      }}
                      // disabled={isPending}
                      disabled={quantity === 1}
                    >
                      {CommonSvg.subtract({ className: 'h-3 w-3' })}
                    </Button>
                    <div>
                      <Input
                        id={`quantity`}
                        type="text"
                        min="0"
                        className="h-8 w-10 rounded-none border-x-0 text-black "
                        value={quantity}
                        disabled
                        // onChange={(e) => {
                        //   startTransition(async () => {
                        //     try {
                        //       await updateCartItemAction({
                        //         productId: cartLineItem.id,
                        //         quantity: Number(e.target.value),
                        //       });
                        //     } catch (err) {
                        //       catchError(err);
                        //     }
                        //   });
                        // }}
                        // disabled={isPending}
                      />
                    </div>

                    <Button
                      id={`increment`}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                      // disabled={isPending}
                    >
                      {CommonSvg.add({ className: 'h-3 w-3' })}
                      <span className="sr-only">Add one item</span>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row gap-x-3">
                  Tổng tiền :{' '}
                  {currencyFormat(
                    currentPrice * quantity -
                      (currentPrice * quantity * user?.giamGia) / 100
                  )}
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={onSubmit}
                    className="w-[60%] bg-transparent text-red-400 border-1 border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    Thanh toán
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogCustom>
    </div>
  );
};
