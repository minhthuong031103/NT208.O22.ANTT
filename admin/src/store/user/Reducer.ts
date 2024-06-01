/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { IAppState } from '@/types/app';

const initialState = {
  loading: false,
  error: null,
  isAuth: false,
  profile: null,
  user: null,
} as IAppState;

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    actionStopRequest: state => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    getDataSuccess: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        error: null,
        loading: false,
        ...payload,
      };
    },
    reset: () => initialState,
  },
});

export const { actionRequest, actionStopRequest, getDataSuccess, reset } = userSlice.actions;

export default userSlice.reducer;
