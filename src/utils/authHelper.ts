import axiosInstance from "@/api/interceptor";

// Export các function helper
export const setAuthHeader = (token: string): void => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthHeader = (): void => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};
