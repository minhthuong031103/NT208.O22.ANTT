/** @format */
import { API_ENDPOINT } from '@/lib/endpoint';
import * as UserActions from '@store/user';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from './useModal';
import toast from 'react-hot-toast';
import { deleteRequest, getRequest, postRequest } from '@/lib/fetch';

export const useNews = () => {
  const dispatch = useDispatch();
  const { onOpenEditModal } = useModal();
  const uploadImage = useCallback(
    ({ formData, callback }) => {
      try {
        dispatch(
          UserActions.postBaseActionsRequest(
            {
              formData,
              isFormData: true,
              endPoint: API_ENDPOINT.NEWS.UPLOAD_IMAGE,
              headers: {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            },
            res => {
              console.log(res);
              callback(res);
            },
          ),
        );
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch],
  );

  const onCreateNews = async ({ formData, callback }) => {
    try {
      const res = await postRequest({
        endPoint: API_ENDPOINT.NEWS.CREATE,
        formData,
        isFormData: true,
      });
      console.log("AAAAAAAAAAAA",res);
      if (res?.status === 200 || res?.message === 'create success') {
        toast.success('Create New successfully');
        callback();
      } else {
        toast.error('Create New fail');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onGetNews = async ({ page, search, limit, callback }) => {
    try {
      const res = await getRequest({ endPoint: API_ENDPOINT.NEWS.GET({ page, search, limit }) });
      console.log(res);
      if (res?.status === 200 && res?.message === 'success') {
        callback(res?.data[1]);
        return res?.data[0]?.items;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onGetNewsDetail = useCallback(({ id }) => {
    dispatch(
      UserActions.getBaseActionsRequest({ endPoint: API_ENDPOINT.NEWS.GET_DETAIL(id) }, res => {
        console.log(res);
        onOpenEditModal({ data: res?.data });
      }),
    );
  }, []);

  const onUpdateNews = async ({ formData, callback }: { formData: any; callback: any }) => {
    try {
      const res = await postRequest({
        endPoint: API_ENDPOINT.NEWS.UPDATE,
        formData,
        isFormData: true,
      });
      console.log(res);
      if (res?.status === 200 && res?.message === 'Update News success') {
        toast.success('Update News success');
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteNews = async ({ id, callback }: { id: number; callback: any }) => {
    try {
      const res = await deleteRequest({ endPoint: API_ENDPOINT.NEWS.DELETE(id) });
      console.log(res);
      if (res?.status === 200 && res?.message === 'Remove News success') {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { uploadImage, onCreateNews, onGetNews, onGetNewsDetail, onUpdateNews, onDeleteNews };
};
