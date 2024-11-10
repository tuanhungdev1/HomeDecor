export interface ProductImage {
  id: number;
  productVariantId: number;
  imageUrl: string;
  isMainImage: boolean;
}

export interface ProductImageForUpdate {
  fileImage: File;
  isMainImage: boolean;
}
export interface ProductImageForCreate {
  fileImage: File;
  isMainImage: boolean;
}

export interface ProductVariant {
  id: number;
  productId: number;
  color: string;
  sku: string;
  isMainVariant: boolean;
  originalPrice: number;
  discountPercentage?: number;
  discountPrice: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  stockQuantity: number;
  isNewStartDate?: Date;
  isNewEndDate?: Date;
  isCurrentlyNew: boolean;
  isActive: boolean;
  stockStatus: string;
  productImages?: ProductImage[];
}

export interface ProductVariantForCreate {
  color: string;
  sku: string;
  isMainVariant: boolean;
  originalPrice: number;
  discountPercentage?: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  stockQuantity: number;
  isActive: boolean;
  images?: ProductImageForCreate[];
}

export interface ProductVariantForUpdate {
  color: string;
  sku: string;
  isMainVariant: boolean;
  originalPrice: number;
  discountPercentage?: number;
  discountPrice: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  stockQuantity: number;
  isNewStartDate?: Date;
  isNewEndDate?: Date;
  isActive: boolean;
  productImages?: ProductImageForUpdate[];
}

export interface ProductDetails {
  measurements: string;
  roomType?: string;
  weight?: number;
  height?: number;
  material?: string;
  features?: string;
  careInStruction?: string;
  warrantyInfo?: string;
  maintenanceInstructions?: string;
  recomemdedCleaningProduct?: string;
}

export interface ProductDetailsForCreate {
  measurements: string;
  roomType?: string;
  weight?: number;
  height?: number;
  material?: string;
  features?: string;
  careInStruction?: string;
  warrantyInfo?: string;
  maintenanceInstructions?: string;
  recomemdedCleaningProduct?: string;
}

export interface ProductDetailsForUpdate {
  measurements: string;
  roomType?: string;
  weight?: number;
  height?: number;
  material?: string;
  features?: string;
  careInStruction?: string;
  warrantyInfo?: string;
  maintenanceInstructions?: string;
  recomemdedCleaningProduct?: string;
}

export interface Product {
  id: number;
  name: string;
  shortDescription?: string;
  baseSku?: string;
  measurements?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  isPublished?: boolean;
  categoryId?: number;
  brandId?: number;
  supplierId?: number;
  productDetails?: ProductDetails;
  productVariants?: ProductVariant[];
}

export interface ProductForUpdate {
  name: string;
  shortDescription?: string;
  baseSku?: string;
  measurements?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  isPublished?: boolean;
  categoryId?: number;
  brandId?: number;
  supplierId?: number;
  productDetails?: ProductDetailsForUpdate;
  productVariants?: ProductVariantForUpdate[];
}

export interface ProductForCreate {
  name: string;
  shortDescription?: string;
  baseSku?: string;
  measurements?: string;
  status?: string;
  isPublished?: boolean;
  categoryId?: number;
  brandId?: number;
  supplierId?: number;
  productDetails?: ProductDetailsForCreate;
  productVariants?: ProductVariantForCreate[];
}
