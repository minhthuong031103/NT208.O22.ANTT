/** @format */

import { getRequest, postRequest } from '@/lib/fetch';



class Query {
  duyetKhachHang?: null | string | string[];
  search?: null | string;
  start?: null | number;
  count?: null | number;
}

export function useCustomers() {
  async function getCustomers(q: Query) {
    let query = ``;
    if (q.duyetKhachHang) {
      if (Array.isArray(q.duyetKhachHang)) {
        q.duyetKhachHang.forEach(item => {
          query += `&duyetKhachHang=${item === null ? '' : item}`;
        });
      } else {
        query += '&duyetKhachHang=' + q.duyetKhachHang;
      }
    }
    if (q.start !== null && q.count !== null) {
      query += '&start=' + q.start + '&count=' + q.count;
    }
    if (q.search) {
      query += `&search=${q.search}`;
    }
    return await getRequest({ endPoint: '/api/users/read?' + query });
  }
  async function countCustomers({ duyetKhachHang }) {
    let query = ``;
    if (duyetKhachHang) {
      if (Array.isArray(duyetKhachHang)) {
        duyetKhachHang.forEach(item => {
          query += `&duyetKhachHang=${item === null ? '' : item}`;
        });
      } else {
        query += '&duyetKhachHang=' + duyetKhachHang;
      }
    }
    return await getRequest({ endPoint: '/api/users/read?getcount&' + query });
  }
  async function setCustomerStatus(form: any) {
    return await postRequest({
      endPoint: '/api/users/updateCustomerStatus',
      formData: form,
      isFormData: false,
    });
  }
  return {
    getCustomers,
    countCustomers,
    setCustomerStatus,
  };
}
