/** @format */

// import {ROUTES} from 'utils';
import { IHomeActionPayload } from '@/types/app';
export const UserActions = {
  GET_BASE_ACTIONS: 'GET_BASE_ACTIONS_USER',
  POST_BASE_ACTIONS: 'POST_BASE_ACTIONS_USER',
  PUT_BASE_ACTIONS: 'PUT_BASE_ACTIONS_USER',
  LOGOUT: 'LOGOUT',
};

export const getBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: UserActions.GET_BASE_ACTIONS,
  callback,
});

export const postBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || UserActions.POST_BASE_ACTIONS,
  callback,
});
export const putBaseActionsRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: payload?.type || UserActions.PUT_BASE_ACTIONS,
  callback,
});

export const logoutRequest = (callback?: IHomeActionPayload['callback']) => {
  return {
    type: UserActions.LOGOUT,
    callback,
  };
};
