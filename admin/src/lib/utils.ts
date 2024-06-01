/** @format */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import numeral from 'numeral';
import toast from 'react-hot-toast';


const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}

export function checkEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}

export function currencyFormat(num) {
  return `${numeral(num).format('0,0')} VND`;
}
export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal',
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}
export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every(file => file instanceof File);
}
export const parseJSON = (str: string, out = []) => {
  try {
    const val = JSON.parse(str);
    return val ?? out;
  } catch (error) {
    return out;
  }
};

export const showErr = message => {
  toast.error(message);
};

export const convertTimeStamps = (time: any) => {
  return (Date.parse(time) / 1000).toString();
};

export const convertTimeStampToDate = (time: any) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
  const date = new Date(time * 1000); // multiply by 1000 to convert seconds to milliseconds
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

export const combineDateTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes);
  return newDate;
};
export function isNumber(str) {
  return /^\d+(\.\d+)?$/.test(str);
}


