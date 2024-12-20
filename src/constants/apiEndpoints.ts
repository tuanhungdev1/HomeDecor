const API_BASE_URL = "https://localhost:7038/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    CURRENT_USER: `${API_BASE_URL}/auth/me`,
    REFRESH_TOKEN: `${API_BASE_URL}/token/refresh`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    ADMIN_LOGIN: `${API_BASE_URL}/auth/admin/login`,
  },
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/products`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,
    CREATE: `${API_BASE_URL}/products`,
    UPDATE: (id: string) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/products/${id}`,
  },
  ORDERS: {
    GET_ALL: `${API_BASE_URL}/orders`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/orders/${id}`,
    CREATE: `${API_BASE_URL}/orders`,
  },

  USERS: {
    UPDATE_USER: (id: string) => `${API_BASE_URL}/user/${id}`,
    UPLOAD_AVATAR_USER: (id: string) =>
      `${API_BASE_URL}/user/${id}/upload-avatar`,
    ADD_ADDRESS_FOR_USER: (id: string) => `${API_BASE_URL}/user/${id}/address`,
    REMOVE_ADDRESS_FOR_USER: (userId: string, addressId: string) =>
      `${API_BASE_URL}/user/${userId}/address/${addressId}`,
    UPDATE_ADDRESS_FOR_USER: (userId: string, addressId: string) =>
      `${API_BASE_URL}/user/${userId}/address/${addressId}`,

    GET_USER_INFOR: (id: string) => {
      return `${API_BASE_URL}/user/${JSON.parse(id)}`;
    },

    UPLOAD_FILE_USER_AVATAR: (userId: string) =>
      `${API_BASE_URL}/user/${JSON.parse(userId)}/upload-avatar`,
  },
  // Thêm các nhóm endpoint khác tại đây

  // BRAND
  BRAND: {
    GET_ALL_BRAND: `${API_BASE_URL}/brand`,
    GET_BRAND_BY_ID: (brandId: number) => `${API_BASE_URL}/brand/${brandId}`,
    UPDATE_BRAND: (brandId: number) => `${API_BASE_URL}/brand/${brandId}`,
    DELETE_BRAND_BY_ID: (brandId: number) => `${API_BASE_URL}/brand/${brandId}`,
    CREATE_BRAND: `${API_BASE_URL}/brand`,
  },
  // BRAND

  // SUPPLIER
  SUPPLIER: {
    GET_ALL_SUPPLIER: `${API_BASE_URL}/supplier`,
    GET_SUPPLIER_BY_ID: (supplierId: number) =>
      `${API_BASE_URL}/supplier/${supplierId}`,
    UPDATE_SUPPLIER: (supplierId: number) =>
      `${API_BASE_URL}/supplier/${supplierId}`,
    DELETE_SUPPLIER_BY_ID: (supplierId: number) =>
      `${API_BASE_URL}/supplier/${supplierId}`,
    CREATE_SUPPLIER: `${API_BASE_URL}/supplier`,
  },
  // SUPPLIER
};
