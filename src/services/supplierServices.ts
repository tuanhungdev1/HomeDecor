import axiosInstance from "@/api/interceptor";
import { API_ENDPOINTS } from "@/constants";
import { RequestParams } from "@/types/type";

export interface Supplier {
  id: number;
  name: string;
  description?: string;
  contactPerson: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  logoUrl?: string;
  isActive: string;
  createdAt: Date;
}

export interface SupplierForCreate {
  name: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  logoFile?: File;
  isActive: string;
}
export interface SupplierForUpdate {
  name: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  logoFile?: File;
  isActive: string;
  isDeleteImage: boolean;
}

export const supplierService = {
  getAllBrands: (supplierRequestParams: RequestParams) => {
    return axiosInstance.get<Supplier[]>(
      API_ENDPOINTS.SUPPLIER.GET_ALL_SUPPLIER,
      {
        params: supplierRequestParams,
      }
    );
  },

  getSupplierByID: (supplierId: number) => {
    return axiosInstance.get(
      API_ENDPOINTS.SUPPLIER.GET_SUPPLIER_BY_ID(supplierId)
    );
  },

  updateSupplier: (
    supplierId: number,
    supplierForUpdate: SupplierForUpdate
  ) => {
    return axiosInstance.put(
      API_ENDPOINTS.SUPPLIER.UPDATE_SUPPLIER(supplierId),
      supplierForUpdate
    );
  },

  createSupplier: (supplierForCreate: SupplierForCreate) => {
    return axiosInstance.post(
      API_ENDPOINTS.SUPPLIER.CREATE_SUPPLIER,
      supplierForCreate
    );
  },
};
