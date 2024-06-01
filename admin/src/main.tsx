/** @format */

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store, persistor } from '@store/createStore';
import { UserProvider } from './context/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from '@nextui-org/react';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <UserProvider>
            <Toaster />
            <App />
          </UserProvider>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </NextUIProvider>,
);
