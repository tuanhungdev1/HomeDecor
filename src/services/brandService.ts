import axiosInstance from "@/api/interceptor";
import { API_ENDPOINTS } from "@/constants";
import { Product, RequestParams } from "@/types/type";

export interface Brand {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  isActive?: boolean;
  createdAt?: Date;
  products?: Product[];
}
export interface BrandForCreate {
  name: string;
  description?: string;
  logoFile?: File;
  isActive?: boolean;
}

export interface BrandForUpdate {
  name: string;
  description?: string;
  logoUrl?: File;
  isActive?: boolean;
  isDeleteImage?: boolean;
}

export const brandService = {
  getAllBrands: (brandRequestParams: RequestParams) => {
    return axiosInstance.get<Brand[]>(API_ENDPOINTS.BRAND.GET_ALL_BRAND, {
      params: brandRequestParams,
    });
  },

  getBrandByID: (brandId: number) => {
    return axiosInstance.get(API_ENDPOINTS.BRAND.GET_BRAND_BY_ID(brandId));
  },

  updateBrand: (brandId: number, brandForUpdate: BrandForUpdate) => {
    return axiosInstance.put(
      API_ENDPOINTS.BRAND.UPDATE_BRAND(brandId),
      brandForUpdate
    );
  },

  createBrand: (brandForCreate: BrandForCreate) => {
    return axiosInstance.post(API_ENDPOINTS.BRAND.CREATE_BRAND, brandForCreate);
  },
};
