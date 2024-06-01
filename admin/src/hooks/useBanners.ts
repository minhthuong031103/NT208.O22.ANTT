/** @format */

import { API_ENDPOINT } from '@/lib/endpoint';
import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useBanner = () => {
  const onGetBanners = async () => {
    const uri =
      import.meta.env.VITE_REACT_APP_BASE_URI + '/api/' + API_ENDPOINT.SETTINGS.BANNERS.GET_BANNERS;
    try {
      const res = await getRequest({ endPoint: uri });

      // if (res?.status === 200 && res?.message === 'success') {
      //   callback(res?.data[1]);
      //   return res?.data[0]?.items;
      // }
      if (res?.message === 'success') {
        return res?.items;
      }

      return [];
    } catch (e) {
      toast.error('Tải về dữ liệu thất bại');
      return [];
    }
  };

  const onCreateBanner = async ({ formData, callback }) => {
    try {
      const res = await postRequest({
        endPoint: '/api/banner/create',
        formData,
        isFormData: false,
      });

      if (res?.message === 'Success') {
        toast.success('Đã thêm banner');
        callback();
      } else {
        throw {};
      }
    } catch (e) {
      toast.error('Không thể thêm banner');
    }
  };

  const onDeleteBanner = async ({ id, callback }) => {
    try {
      const res = await postRequest({
        endPoint: '/api/banner/delete',
        formData: { id: id },
        isFormData: false,
      });

      if (res?.message === 'Success') {
        toast.success('Đã xóa banner');
        callback();
      } else {
        throw {};
      }
    } catch (e) {
      toast.error('Không thể xóa banner');
    }
  };

  const onUpdateBannerIndices = async ({ id, from, to, callback }) => {
    try {
      const res = await postRequest({
        endPoint: '/api/banner/updateIndices',
        formData: { id: id, from: from, to: to },
        isFormData: false,
      });

      if (/*res?.status === 200 &&*/ res?.message === 'Success') {
        toast.success('Sắp xếp banner thành công');
        callback();
      } else {
        throw {};
      }
    } catch (e) {
      toast.error('Không thể sắp xếp banner');
    }
  };

  return { onGetBanners, onCreateBanner, onDeleteBanner, onUpdateBannerIndices };
};
