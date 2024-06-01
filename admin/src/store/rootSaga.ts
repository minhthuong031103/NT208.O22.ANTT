/** @format */

import { all } from 'redux-saga/effects';
import userSagas from './user/Sagas';

export default function* rootSaga() {
  yield all([userSagas()]);
}
