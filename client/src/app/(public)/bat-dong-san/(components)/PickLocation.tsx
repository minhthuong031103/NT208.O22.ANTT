'use client';

import React, { useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { getRequest } from '@/lib/fetch';
import DialogCustom from '@/components/ui/dialogCustom';
import { Button } from '@/components/ui/button';
import { IoLocationOutline } from 'react-icons/io5';

import TinhTP from '@/hanhchinhvn/tinh_tp.json';
import QuanHuyen from '@/hanhchinhvn/quan_huyen.json';

import XaPhuong from '@/hanhchinhvn/xa_phuong.json';

export const PickLocation = ({ addressValue, setAddressValue }) => {
  const [selectedProvince, setSelectedProvince] = React.useState(new Set([]));
  const [selectedDistrict, setSelectedDistrict] = React.useState(new Set([]));
  const [selectedWard, setSelectedWard] = React.useState(new Set([]));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [diaChiTouched, setDiaChiTouched] = React.useState(false);
  const [provinceTouched, setProvinceTouched] = React.useState(false);
  const [districtTouched, setDistrictTouched] = React.useState(false);
  const [wardTouched, setWardTouched] = React.useState(false);

  const [isLoadingProvince, setIsLoadingProvince] = React.useState(false);
  const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);
  const [isLoadingWard, setIsLoadingWard] = React.useState(false);

  const [provinces, setProvince] = React.useState([]);
  const [districts, setDistrict] = React.useState([]);
  const [wards, setWard] = React.useState([]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    async function getProvince() {
      setIsLoadingProvince(true);
      // const res = await getRequest({
      //   endPoint: 'https://provinces.open-api.vn/api/p/'
      // })
      // const res = await axios('https://provinces.open-api.vn/api/p/');
      // setProvince(res.data);
      setProvince(
        Object.values(TinhTP).sort((a, b) =>
          a.name_with_type.localeCompare(b.name_with_type)
        ) as any
      );
      setIsLoadingProvince(false);
    }
    getProvince();
  }, []);
  useEffect(() => {
    setDistrict([]);
    setWard([]);
    async function getDistrict() {
      if (selectedProvince.size > 0) {
        setIsLoadingDistrict(true);
        const valuesArray = Array.from(selectedProvince);
        const provinceCode = valuesArray[0];
        // const res = await getRequest({
        //   endPoint: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        // })
        const filterCity = Object.keys(QuanHuyen)
          .filter(
            (key) => QuanHuyen[key].parent_code === TinhTP[provinceCode]?.code
          )
          .map((key) => QuanHuyen[key]);

        setDistrict(
          Object.values(filterCity).sort((a, b) =>
            a.name_with_type.localeCompare(b.name_with_type)
          ) as any
        );
        setIsLoadingDistrict(false);
      }
    }
    getDistrict();
  }, [selectedProvince]);

  useEffect(() => {
    setWard([]);
    async function getWard() {
      if (selectedDistrict.size > 0) {
        setIsLoadingWard(true);
        const valuesArray = Array.from(selectedDistrict);
        const districtCode = valuesArray[0];
        // const res = await getRequest({
        //   endPoint: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        // })
        // const res = await axios.get(
        //   `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
        // );
        const filterWard = Object.keys(XaPhuong)
          .filter(
            (key) => XaPhuong[key].parent_code === QuanHuyen[districtCode]?.code
          )
          .map((key) => XaPhuong[key]);
        setWard(
          Object.values(filterWard).sort((a, b) =>
            a.name_with_type.localeCompare(b.name_with_type)
          ) as any
        );
        setIsLoadingWard(false);
      }
    }

    getWard();
  }, [selectedDistrict]);
  useEffect(() => {
    async function setValue() {
      if (selectedWard.size > 0) {
        const valuesArrayProvince = Array.from(selectedProvince);
        const provinceCode = valuesArrayProvince[0];
        const provinceValue = await provinces.find(
          (province) => province.code == provinceCode
        )?.name_with_type;
        const valuesArrayDistrict = Array.from(selectedDistrict);
        const districtCode = valuesArrayDistrict[0];
        const districtValue = await districts.find(
          (district) => district.code == districtCode
        )?.name_with_type;
        const valuesArrayWard = Array.from(selectedWard);
        const wardCode = valuesArrayWard[0];
        const wardValue = await wards.find((ward) => ward.code == wardCode)
          ?.name_with_type;

        setAddressValue(`${wardValue}, ${districtValue}, ${provinceValue}`);
      }
    }

    setValue();
  }, [selectedWard]);
  //
  const isProvinceValid = selectedProvince.size > 0;
  const isDistrictValid = selectedDistrict.size > 0;
  const isWardValid = selectedWard.size > 0;

  const onSubmit = () => {
    const valuesArrayProvince = Array.from(selectedProvince);
    const provinceCode = valuesArrayProvince[0];
    const provinceValue = provinces.find(
      (province) => province.code == provinceCode
    )?.name_with_type;

    const valuesArrayDistrict = Array.from(selectedDistrict);
    const districtCode = valuesArrayDistrict[0];
    const districtValue = districts.find(
      (district) => district.code == districtCode
    )?.name_with_type;

    const valuesArrayWard = Array.from(selectedWard);
    const wardCode = valuesArrayWard[0];
    const wardValue = wards.find(
      (ward) => ward.code == wardCode
    )?.name_with_type;
    let value = '';
    if (typeof wardValue !== 'undefined') {
      value += wardValue + ', ';
    }
    if (typeof districtValue !== 'undefined') {
      value += districtValue + ', ';
    }
    if (typeof provinceValue !== 'undefined') {
      value += provinceValue;
    }
    setAddressValue(value);
    setIsModalOpen(false);
  };
  return (
    <div>
      {isModalOpen ? (
        <DialogCustom
          className="lg:w-[40%] lg:h-fit pb-4"
          onClose={() => {
            setIsModalOpen(false);
            setDiaChiTouched(true);
          }}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        >
          <div className="flex flex-col gap-y-6 px-1">
            <div className="mr-6">
              <Select
                key={'province'}
                className="h-[52px]"
                variant="bordered"
                radius="sm"
                size="sm"
                label="Thành phố, tỉnh thành"
                isInvalid={isProvinceValid || !provinceTouched ? false : true}
                autoFocus={false}
                placeholder="Chọn thành phố, tỉnh thành"
                selectedKeys={selectedProvince}
                isLoading={isLoadingProvince}
                onSelectionChange={setSelectedProvince}
                onClose={() => setProvinceTouched(true)}
              >
                {provinces?.map((province) => (
                  <SelectItem key={province.code} value={province.code}>
                    {province.name_with_type}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="mr-6">
              <Select
                key={'district'}
                className="h-[52px]"
                variant="bordered"
                radius="sm"
                size="sm"
                label="Quận, huyện"
                isInvalid={isDistrictValid || !districtTouched ? false : true}
                autoFocus={false}
                placeholder="Chọn quận, huyện"
                selectedKeys={selectedDistrict}
                isLoading={isLoadingDistrict}
                onSelectionChange={setSelectedDistrict}
                onClose={() => setDistrictTouched(true)}
              >
                {districts?.map((district) => (
                  <SelectItem key={district.code} value={district.code}>
                    {district.name_with_type}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="mr-6">
              <Select
                key={'ward'}
                className="h-[52px]"
                variant="bordered"
                radius="sm"
                size="sm"
                label="Xã, phường"
                isInvalid={isWardValid || !wardTouched ? false : true}
                autoFocus={false}
                placeholder="Chọn xã, phường"
                selectedKeys={selectedWard}
                isLoading={isLoadingWard}
                onSelectionChange={setSelectedWard}
                onClose={() => setWardTouched(true)}
              >
                {wards?.map((ward) => (
                  <SelectItem key={ward.code} value={ward.code}>
                    {ward.name_with_type}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="w-full flex items-center justify-center">
              <Button onClick={onSubmit} className="w-full">
                Xác nhận
              </Button>
            </div>
          </div>
        </DialogCustom>
      ) : null}

      <div className="mr-6">
        <Select
          isOpen={false}
          label="Vị trí"
          variant="bordered"
          radius="sm"
          size="sm"
          selectorIcon={<IoLocationOutline />}
          selectedKeys={addressValue !== '' ? [addressValue] : null}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <SelectItem key={addressValue} value={addressValue}>
            {addressValue}
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};
