/** @format */

import { API_ENDPOINT } from '@/lib/endpoint';
import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useSettings = () => {
  const onCreateSettings = async ({ formData, callback }) => {
    console.log(formData);
    console.log('create');
    try {
      const res = await postRequest({
        endPoint: API_ENDPOINT.SETTINGS.CREATE,
        formData,
        isFormData: true,
      });
      console.log(res);
      if (res?.status === 200) {
        callback(res);
        toast.success('Create new setting success');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onGetSetting = async (type) => {
    try {
      const res = await getRequest({
        endPoint: API_ENDPOINT.SETTINGS.GETBYTYPE(type),
      });
      console.log(res);
      if (res?.status === 200 && res?.message === 'success' && res?.data)
        return res?.data[0]?.items;

      return [];
    } catch (e) {
      console.log(e);
    }
  };
  const onUpdateSettings = async ({ formData, callback }) => {
    console.log('update');
    try {
      const res = await postRequest({
        endPoint: API_ENDPOINT.SETTINGS.UPDATE,
        formData,
        isFormData: true,
      });
      console.log(res);
      if (res?.status === 200) {
        callback(res);
        toast.success('Update setting success');
      } else {
        toast.error('Update setting failed');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    onCreateSettings,
    onUpdateSettings,
    onGetSetting,
  };
};
