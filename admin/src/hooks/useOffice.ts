/** @format */
import toast from 'react-hot-toast';
import { getRequest, postRequest } from '@/lib/fetch';

export const useOffice = () => {
  const onGetOffice = async () => {
    try {
      const res = await getRequest({ endPoint: `/api/office` });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateOffice = async ({ submitData }: { submitData: any}) => {
    try {
      const res = await postRequest({
        endPoint: `/api/office/sua`,
        formData: submitData,
        isFormData: false,
      });
      if (res) {
        toast.success(`Sửa thông tin văn phòng thành công`);
      }
    } catch (e) {
      console.error(e);
    }
  };


  return { onGetOffice, onUpdateOffice };
};
