import axiosInstance from "@/api/interceptor";
import { API_ENDPOINTS } from "@/constants";
import { UserUpdate } from "@/types/type";

export const userService = {
  updateUserInfor: (userId: string, userInfor: UserUpdate) =>
    axiosInstance.put(API_ENDPOINTS.USERS.UPDATE_USER(userId), userInfor),

  getUserInfor: (userId: string) => {
    console.log(userId);
    console.log(JSON.parse(userId));
    axiosInstance.get(API_ENDPOINTS.USERS.GET_USER_INFOR(JSON.parse(userId)));
  },
  uploadFileUserAvatar: (userId: string, formData: FormData) =>
    axiosInstance.post(
      API_ENDPOINTS.USERS.UPLOAD_FILE_USER_AVATAR(JSON.parse(userId)),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
};
