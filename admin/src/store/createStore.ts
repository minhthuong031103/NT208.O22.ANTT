/** @format */

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (import.meta.env.MODE === 'development') {
  middleware.push(logger);
}
const store = configureStore({
  reducer: persistedReducer,
  middleware: [...middleware],
});
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
