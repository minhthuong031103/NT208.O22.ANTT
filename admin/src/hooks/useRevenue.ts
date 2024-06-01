/** @format */

import { getRequest } from '@/lib/fetch';

export function useRevenue() {
  const getRevenue = async ({ year }) => {
    const res = await getRequest({
      endPoint: `${import.meta.env.VITE_REACT_APP_BASE_URI}/api/revenue/read?year=${year}`,
    });
    if (res) {
      return res.data;
    }
    return [];
  };

  return { getRevenue };
}
