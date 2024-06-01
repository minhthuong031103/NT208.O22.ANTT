/** @format */

import { KEY_CONTEXT } from '@lib/constants';

export function useKey() {
  const setKeySite = ({ accessToken }) => {
    localStorage.setItem(KEY_CONTEXT.ACCESS_TOKEN, accessToken);
  };

  const setUserLogin = ({ user }) => {
    localStorage.setItem(KEY_CONTEXT.USER, user);
  };

  const removeKeySite = () => {
    localStorage.removeItem(KEY_CONTEXT.ACCESS_TOKEN);
    localStorage.removeItem(KEY_CONTEXT.USER);
  };

  // custom get value
  const getKey = (key: string) => {
    return localStorage.getItem(key);
  };

  // custom remove value
  const removeKey = (key: string) => {
    return localStorage.removeItem(key);
  };
  const setStorage = ({
    key,
    record,
    parseString,
  }: {
    key: string;
    record: any;
    parseString: boolean;
  }) => {
    try {
      localStorage.setItem(key, parseString ? JSON.stringify(record) : record);
    } catch (error) {
      return;
    }
  };

  return {
    setUserLogin,
    setKeySite,
    getKey,
    removeKey,
    removeKeySite,
    setStorage,
  };
}
