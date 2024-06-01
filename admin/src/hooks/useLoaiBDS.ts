/** @format */
import toast from 'react-hot-toast';
import { getRequest, postRequest } from '@/lib/fetch';

export const useLoaiBDS = () => {
  const onGetAllType = async () => {
    try {
      const res = await getRequest({ endPoint: `/api/loai-bds/all` });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const onGetAllTypeChildById = async (id) => {
    try {
      const res = await getRequest({ endPoint: `/api/loai-bds/loai-hinh?id=${id}` });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateLoaiHinh = async ({ submitData }: { submitData: any}) => {
    try {
      const res = await postRequest({
        endPoint: `/api/loai-bds/update`,
        formData: submitData,
        isFormData: false,
      });
      if (res) {
        toast.success(`Sửa thông tin loại hình thành công`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCreateLoaiHinh = async ({ submitData }: { submitData: any}) => {
    try {
      const res = await postRequest({
        endPoint: `/api/loai-bds/add`,
        formData: submitData,
        isFormData: false,
      });
      if (res) {
        toast.success(`Thêm thông tin loại hình mới thành công`);
        return res;
      }
    } catch (e) {
      console.error(e);
    }
  };
  return { onGetAllType, onGetAllTypeChildById ,onUpdateLoaiHinh, onCreateLoaiHinh };
};
