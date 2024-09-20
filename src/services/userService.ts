import axiosInstance from "@/api/interceptor";
import { API_ENDPOINTS } from "@/constants";
import { UserUpdate } from "@/types/type";

export const userService = {
  updateUserInfor: (userId: string, userInfor: UserUpdate) =>
    axiosInstance.put(API_ENDPOINTS.USERS.UPDATE_USER(userId), userInfor),
};
