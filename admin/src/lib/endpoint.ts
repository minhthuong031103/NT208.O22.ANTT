/** @format */

export const API_ENDPOINT = {
  AUTH: {
    LOGIN: '/api/auth/login-admin',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },

  NEWS: {
    UPLOAD_IMAGE: 'news/upload',
    CREATE: 'news/create',
    GET: ({ page, limit, search }: { page: number; limit: number; search?: string }) => {
      return `news/all?limit=${limit}&page=${page}&search=${search}`;
    },
    GET_DETAIL: (id: number) => {
      return `news?id=${id}`;
    },
    UPDATE: 'news/update',
    DELETE: id => `news/?id=${id}`,
  },
  EVENTS: {
    GET: ({ page, limit, search }: { page: number; limit: number; search?: string }) => {
      return `events/all?limit=${limit}&page=${page}&search=${search}`;
    },
    CREATE: 'events/create',
    GET_DETAIL: (id: number) => {
      return `events?id=${id}`;
    },
    UPDATE: 'events/update',
    DELETE: id => `events/?id=${id}`,
  },
  APP_SERVICE: {
    UPLOAD_IMAGE: 'app-services/upload',
    CREATE: 'app-services/create',
    GET: ({ page, limit, search }: { page: number; limit: number; search?: string }) => {
      return `app-services/all?limit=${limit}&page=${page}&search=${search}`;
    },
    GET_DETAIL: (id: number) => {
      return `app-services?id=${id}`;
    },
    UPDATE: 'app-services/update',
    DELETE: id => `app-services/delete?id=${id}`,
  },

  SETTINGS: {
    CREATE: 'settings/create',
    UPDATE: 'settings/update',
    GETBYTYPE: type => `settings/type?type=${type}`,
    BANNERS: {
      GET_BANNERS: 'banner/all',
      CREATE: 'banner/create',
      DELETE: (id: number) => `banner/?id=${id}`,
    },
  },
  WALLET: {
    GET: ({ page, limit, search }: { page: number; limit: number; search?: string }) => {
      return `wallet/all?limit=${limit}&page=${page}&search=${search}`;
    },
    CREATE: 'wallet',
    GET_DETAIL: (id: number) => {
      return `wallet?id=${id}`;
    },
    UPDATE: 'wallet/update',
    DELETE: id => `wallet/?id=${id}`,
  },
  BENEFIT: {
    GET: ({ page, limit, search }: { page: number; limit: number; search?: string }) => {
      return `benefits/all?limit=${limit}&page=${page}&search=${search}`;
    },
    CREATE: 'benefits/create',
    GET_DETAIL: (id: number) => {
      return `benefits?id=${id}`;
    },
    UPDATE: 'benefits/update',
    DELETE: id => `benefits/?id=${id}`,
  },
};
