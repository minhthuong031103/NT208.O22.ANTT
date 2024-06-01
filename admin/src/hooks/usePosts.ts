/** @format */
import * as UserActions from '@store/user';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from './useModal';
import toast from 'react-hot-toast';
import { getRequest, postRequest } from '@/lib/fetch';

export const usePosts = () => {
  const dispatch = useDispatch();
  const { onOpenEditModal } = useModal();

  const onGetPosts = async ({page,limit,search,type}) => {
    try {
      const res = await getRequest({ endPoint: `/api/bat-dong-san/admin?page=${page}&limit=${limit}&type=${type}&search=${search}` });
      return res;
    } catch (e) {
      console.error(e);
    }
  };
  const onGetPostDetail = useCallback(({ id }) => {
    dispatch(
      UserActions.getBaseActionsRequest({ endPoint: `/api/bat-dong-san/admin/chi-tiet-bai-viet?id=${id}` }, res => {
        console.error(res);
        onOpenEditModal({ data: res?.data });
      }),
    );
  }, []);

  const onUpdatePost = async ({ formData, callback }: { formData: any; callback: any }) => {
    try {
      const res = await postRequest({
        endPoint: `/api/bat-dong-san/admin/cap-nhat-bai-viet`,
        formData,
        isFormData: false,
      });
      if (res) {
        toast.success(`${formData.trangThai === 'da_duyet'?'Đã chấp nhận duyệt bài':formData.trangThai === 'khong_duyet'?'Đã từ chối duyệt bài':'Khóa bài thành công'}`);
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };


  return { onGetPosts, onGetPostDetail, onUpdatePost };
};
