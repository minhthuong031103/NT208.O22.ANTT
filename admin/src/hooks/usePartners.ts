/** @format */

import { getRequest, postRequest } from '@/lib/fetch';


class Query {
  duyetDoiTac?: null | string;
  search?: null | string;
  start?: null | number;
  count?: null | number;
}

export function usePartners() {
  async function getPartners(q: Query) {
    let query = ``;
    if (q.duyetDoiTac) {
      if (Array.isArray(q.duyetDoiTac)) {
        q.duyetDoiTac.forEach(item => {
          query += `&duyetDoiTac=${item === null ? '' : item}`;
        });
      } else {
        query += '&duyetDoiTac=' + q.duyetDoiTac;
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
  async function countPartners({ duyetDoiTac }) {
    let query = ``;
    if (duyetDoiTac) {
      if (Array.isArray(duyetDoiTac)) {
        duyetDoiTac.forEach(item => {
          query += `&duyetDoiTac=${item === null ? '' : item}`;
        });
      } else {
        query += '&duyetDoiTac=' + duyetDoiTac;
      }
    }
    return await getRequest({ endPoint: '/api/users/read?getcount&' + query });
  }
  async function setPartnerStatus(form: any) {
    return await postRequest({
      endPoint: '/api/users/updatePartnerStatus',
      formData: form,
      isFormData: false,
    });
  }
  return {
    getPartners,
    countPartners,
    setPartnerStatus,
  };
}
