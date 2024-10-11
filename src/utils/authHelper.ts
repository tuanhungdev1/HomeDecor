/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api/interceptor";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ID_KEY = "userId";

// Export các function helper
export const setAuthHeader = (token: string): void => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthHeader = (): void => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Lưu data vào localStorage (remember me = true)
export function saveAuthData(data: any): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(data.token));
  localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(data.refreshToken));
  localStorage.setItem(USER_ID_KEY, JSON.stringify(data.data));
}

// Lưu data vào sessionStorage (remember me = false)
export function saveAuthDataToSession(data: any): void {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(data.token));
  sessionStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(data.refreshToken));
  sessionStorage.setItem(USER_ID_KEY, JSON.stringify(data.data));
}

// Lấy access token
export function getAccessToken(): string | null {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY)
  );
}

// Lấy refresh token
export function getRefreshToken(): string | null {
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY)
  );
}

// Lấy user ID
export function getUserId(): string | null {
  return (
    localStorage.getItem(USER_ID_KEY) || sessionStorage.getItem(USER_ID_KEY)
  );
}

// Kiểm tra đã đăng nhập chưa
export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

// Đăng xuất
export function logout(): void {
  // Xóa data từ cả localStorage và sessionStorage
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);

  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_ID_KEY);
}
