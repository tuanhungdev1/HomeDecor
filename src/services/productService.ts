import axiosInstance from "@/api/interceptor";
import { API_ENDPOINTS } from "@/constants";

export const productServices = {
  createProduct: (productForCreate: FormData) => {
    return axiosInstance.post(API_ENDPOINTS.PRODUCTS.CREATE, productForCreate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
