/** @format */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useKey } from '.';
import * as UserActions from '@store/user';
import toast from 'react-hot-toast';
import { API_ENDPOINT } from '@/lib/endpoint';
import { useUserDispatch, dispatchActions } from '@/context';
import { useNavigate } from 'react-router-dom';
import { EUserType } from '@/types/user';
import { ROUTES } from '@/lib';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setKeySite, setUserLogin, removeKeySite } = useKey();
  const userDispatch = useUserDispatch();
  const onLogin = useCallback(({ formData, callback }) => {
    console.log('yahh');
    formData.type = 'ADMIN';
    try {
      dispatch(
        UserActions.postBaseActionsRequest(
          { formData, endPoint: API_ENDPOINT.AUTH.LOGIN, isFormData: false },
          res => {
            console.log(res);
            if (res?.status !== 200) {
              toast.error('Tài khoản hoặc mật khẩu không đúng');
              return;
            }
            if (res?.status === 200) {
              toast.success('Login success');
              setKeySite({ accessToken: 'ok' });
              setUserLogin({ user: 'ADMIN' });
              callback?.();
              callLogin();
            }
          },
        ),
      );
    } catch (error: any) {
      toast.error(error);
    }
    // console.log(formData);
    // setKeySite({ accessToken: '123' });
    // setUserLogin({ user: '123' });
    // callback?.();
    // callLogin();
  }, []);

  const callLogin = () => {
    // getSocketID(() => {
    dispatchActions({ type: EUserType.LOGIN, payload: null }, userDispatch);
    // navigate(`${process.env.REACT_APP_ROOT}/${ROUTES.APP.DASHBOARD}`, { replace: true });
    navigate(ROUTES.APP.DASHBOARD);
    // });
  };
  const onLogout = useCallback(async () => {
    removeKeySite();
    dispatchActions({ type: EUserType.LOGOUT, payload: {} }, userDispatch);
  }, [dispatch]);

  return {
    onLogin,
    onLogout,
  };
};
