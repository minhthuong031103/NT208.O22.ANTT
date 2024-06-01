/** @format */

import { axiosClient } from '.';

export const getRequest = async ({ endPoint }): Promise<any> => {
  const res = await axiosClient.get(endPoint);
  return res;
};

export const postRequest = async ({ endPoint, formData, isFormData }): Promise<any> => {
  const res = await axiosClient.post(
    endPoint,
    isFormData ? formData : JSON.stringify(formData),
    isFormData && {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res;
};

export const deleteRequest = async ({ endPoint }): Promise<any> => {
  const res = await axiosClient.delete(endPoint);
  return res;
};
