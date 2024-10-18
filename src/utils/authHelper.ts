import axiosInstance from "@/api/interceptor";
import { User } from "@/types/type";

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
export function saveAuthData(data: {
  token: string;
  refreshToken: string;
  data: User;
}): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, data.token); // Lưu chuỗi trực tiếp
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken); // Lưu chuỗi trực tiếp
  localStorage.setItem(USER_ID_KEY, JSON.stringify(data.data.id)); // Lưu chuỗi trực tiếp
}

// Lưu data vào sessionStorage (remember me = false)
export function saveAuthDataToSession(data: {
  token: string;
  refreshToken: string;
  data: User;
}): void {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, data.token); // Lưu chuỗi trực tiếp
  sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken); // Lưu chuỗi trực tiếp
  sessionStorage.setItem(USER_ID_KEY, JSON.stringify(data.data.id)); // Lưu chuỗi trực tiếp
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

export const isRemember = (): boolean | null => {
  const accessTokenLocal = localStorage.getItem("accessToken");
  const accessTokenSession = sessionStorage.getItem("accessToken");

  if (accessTokenLocal) {
    return true; // Access token được lưu trong localStorage
  } else if (accessTokenSession) {
    return false; // Access token được lưu trong sessionStorage
  }

  return null; // Không tìm thấy access token
};
