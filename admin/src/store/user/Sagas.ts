/** @format */

import { axiosClient } from '@/lib';
import { takeLatest, put, all } from 'redux-saga/effects';
import { IHomeActionPayload } from '@/types/app';
import { UserActions } from './Actions';
import { actionRequest, actionStopRequest, getDataSuccess, reset } from './Reducer';
import { showErr } from '@/lib/utils';

function* showError(message) {
  showErr(message ?? 'Some thing went wrong!');
  yield put(actionStopRequest());
}

function* onGetBaseActionsRequest(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    const rs = yield axiosClient.get(`${action.payload.endPoint}`);

    if (rs.status === 200 && typeof rs?.data.code === 'undefined') {
      const dataKey = action?.payload?.dataKey;
      const payload = dataKey
        ? {
            [`${dataKey}`]: action?.payload?.isObject ? rs?.data?.result?.[0] : rs?.data,
          }
        : {};
      if (action?.callback) {
        action?.callback?.(rs);
      }
      yield put(getDataSuccess(payload));
    }
    yield put(actionStopRequest());
  } catch (e: any) {
    showErr(e?.data?.message ?? 'Some thing went wrong!');

    yield put(getDataSuccess({}));
    return action?.callback?.({ ...e });
  }
}

function* watchGetBaseActions() {
  yield takeLatest(UserActions.GET_BASE_ACTIONS as any, onGetBaseActionsRequest);
}

function* onPostBaseAction(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    const isFormData = action.payload?.isFormData;
    const rs = yield axiosClient
      .post(
        `${action.payload.endPoint}`,
        isFormData ? action?.payload?.formData : JSON.stringify(action?.payload?.formData),
        isFormData && action.payload.headers,
      )
      .catch(err => showError(err?.data.message ?? 'Some thing went wrong!'));
    console.log('[rs-post]', rs);

    if (rs) {
      if (rs.status === 200) {
        const dataKey = action?.payload?.dataKey;
        const payload = dataKey
          ? {
              [`${dataKey}`]: action?.payload?.isObject ? rs?.data?.result?.[0] : rs?.data?.user,
            }
          : {};
        yield put(getDataSuccess(payload));
      }

      if (action?.callback) {
        action?.callback?.(rs);
      }

      return;
    }

    yield showError(rs?.message ?? 'Some thing went wrong!');
  } catch (e: any) {
    yield put(actionStopRequest());
    if (action?.callback) {
      action?.callback?.(e);
    }
  }
}

function* watchPostBaseActions() {
  yield takeLatest(UserActions.POST_BASE_ACTIONS as any, onPostBaseAction);
}

function* onPutBaseAction(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());

    const isFormData = action.payload?.isFormData;

    const rs = yield axiosClient
      .put(
        `${action.payload.endPoint}`,
        isFormData ? action?.payload?.formData : JSON.stringify(action?.payload?.formData),
        isFormData && action.payload.headers,
      )
      .catch(err => showError(err?.data?.message ?? 'Some thing went wrong!'));

    const dataKey = action?.payload?.dataKey;
    const payload = dataKey
      ? {
          [`${dataKey}`]: action?.payload?.isObject ? rs?.data?.result?.[0] : rs?.data?.user,
        }
      : {};

    yield put(getDataSuccess(payload));

    if (action?.callback) {
      action?.callback?.(rs);
    }
  } catch (e: any) {
    yield put(actionStopRequest());
  }
}

function* watchPutBaseActions() {
  yield takeLatest(UserActions.PUT_BASE_ACTIONS as any, onPutBaseAction);
}

function* onLogoutAction(action) {
  try {
    yield put(actionRequest());
    yield put(reset());
    // yield put(category.reset());
    // yield put(coupon.reset());
    // yield put(reel.reset());
    // yield put(store.reset());
    // const rs = yield axiosClient.post(`${API_ENDPOINT.LOGOUT}`);
    // action?.payload && NavigationService.reset(Routes.Login);
    yield put(actionStopRequest());
    action?.callback?.();
  } catch (e: any) {
    action?.callback?.();
  }
}

function* watchLogout() {
  yield takeLatest(UserActions.LOGOUT as any, onLogoutAction);
}

export default function* userSagas() {
  yield all([watchGetBaseActions(), watchPostBaseActions(), watchPutBaseActions(), watchLogout()]);
}
