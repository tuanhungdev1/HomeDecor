import axiosInstance from "@/api/interceptor";
import { API_ENDPOINTS } from "@/constants";
import { UserUpdate } from "@/types/type";

export const userService = {
  updateUserInfor: async (userId: string, userInfor: UserUpdate) =>
    await axiosInstance.put(API_ENDPOINTS.USERS.UPDATE_USER(userId), userInfor),

  getUserInfor: async (userId: string) =>
    await axiosInstance.get(API_ENDPOINTS.USERS.GET_USER_INFOR(userId)),
};
