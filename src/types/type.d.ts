import { UserRole } from "./Enums";

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

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount: number;
  imageProduct: string;
  isNew: boolean;
  rating: number;
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
  profilePicture?: string;
  dateOfBirth?: string;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  dateOfBirth?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
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
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AddressCardType {
  id: number;
  title: string;
  userName: string;
  phoneNumber: string;
  address: string;
}
