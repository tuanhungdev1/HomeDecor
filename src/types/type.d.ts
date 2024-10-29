/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddressType, UserRole } from "./Enums";

export interface IMenuItem {
  id: string;
  title: string;
  url: string;
}

interface Article {
  id: string;
  title: string;
  imageUrl: string;
}

export interface IImageSlide {
  id: string;
  url: string;
}

interface ProductImage {
  id: number;
  url: string;
  isDefault: boolean;
  alt?: string;
}

// interfaces/category.ts
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  level: number; // Độ sâu của category (0: root, 1: level 1, etc.)
  parentId?: number; // ID của category cha
  parent?: Category; // Category cha
  children?: Category[]; // Các sub-categories
  isActive: boolean;
}

// interfaces/product.ts
interface ColorVariant {
  id: number;
  colorName: string;
  colorCode: string;
  quantity: number;
  images: ProductImage[];
}

interface ProductImage {
  id: number;
  url: string;
  isDefault: boolean;
  alt?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  discountExpiry?: Date;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  measurements: string;
  colors: ColorVariant[];
  sku: string;
  categories: Category[];
}

export interface LoginData {
  username: string;
  password: string;
  rememberPassword: boolean;
}

export interface RegisterData {
  displayName: string;
  userName: string;
  email: string;
  password: string;
  roles: UserRole[];
  agreeTerms: boolean;
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email: string;
  phoneNumber?: string;
  age?: number;
  address?: string;
  profilePicture?: string;
  dateOfBirth?: string;
  addressList?: Address[];
  roles?: UserRole[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  dateOfBirth?: string;
}

export interface AuthState {
  user: User | null;
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: any;
}

export interface UserState {
  user: User | null;
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}

export interface ForgotPasswordFormValues {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenData {
  accessToken: string;
  refreshToken: string;
}

export interface AddressCardType {
  id: number;
  title: string;
  userName: string;
  phoneNumber: string;
  address: string;
}

export interface Address {
  id: number;
  displayName: string;
  phoneNumber: string;
  addressLine: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  isDefault: boolean;
  type: AddressType;
}

export interface RequestParams {
  pageSize?: number;
  pageNumber?: number;
  searchTerm?: string;
  orderBy?: string;
}

export interface PagedResult<T> {
  data: T[];
  totalCount: number;
}
