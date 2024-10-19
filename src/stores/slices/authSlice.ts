/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthState,
  LoginData,
  ForgotPasswordFormValues,
  User,
  UserUpdate,
} from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/authService";
import { FieldSignUpType } from "@/pages/admin/SignUpAdminPage";
import {
  saveAuthData,
  saveAuthDataToSession,
  logout,
  getUserId,
} from "@/utils/authHelper";
import { FieldLoginType } from "@/pages/admin/LoginAdminPage";
import { userService } from "@/services/userService";

export interface ErrorResponseType {
  success: boolean;
  message: string;
  statusCode: number;
  errors: any[];
}

export interface SuccessResponseType {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface SuccessResponseAuthType {
  success: boolean;
  message: string;
  data: User;
  token?: string;
  refreshToken?: string;
  statusCode: number;
  remember?: boolean;
}

export const AUTH_ACTIONS = {
  GET_USER: "auth/getUser",
  UPDATE_USER: "auth/updateUser",
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  LOGIN_ADMIN: "auth/loginAdmin",
  CHANGE_PASSWORD: "auth/changePassword",
  LOGOUT: "auth/logout",
};

// Async Thunks
export const login = createAsyncThunk(
  AUTH_ACTIONS.LOGIN,
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await authService.login(loginData);
      return { ...response.data, remember: loginData.rememberPassword };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loginAdmin = createAsyncThunk<
  SuccessResponseAuthType,
  FieldLoginType,
  {
    rejectValue: ErrorResponseType;
  }
>(
  AUTH_ACTIONS.LOGIN_ADMIN,
  async (loginForm: FieldLoginType, { rejectWithValue }) => {
    try {
      const response = await authService.loginAdmin(loginForm);
      return { ...response.data, remember: loginForm.remember };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk<
  SuccessResponseType,
  FieldSignUpType,
  {
    rejectValue: ErrorResponseType;
  }
>(
  AUTH_ACTIONS.REGISTER,
  async (signUpForm: FieldSignUpType, { rejectWithValue }) => {
    try {
      const response = await authService.register(signUpForm);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const changePassword = createAsyncThunk(
  AUTH_ACTIONS.CHANGE_PASSWORD,
  async (changePasswordData: ForgotPasswordFormValues, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(changePasswordData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  AUTH_ACTIONS.LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const getUserInfo = createAsyncThunk(
  AUTH_ACTIONS.GET_USER,
  async (userId: string, { rejectWithValue }) => {
    try {
      const currentUserId = getUserId();
      if (!currentUserId) {
        return rejectWithValue(
          "User ID is not found in localStorage or sessionStorage"
        );
      }

      if (userId !== currentUserId) {
        return rejectWithValue("The current user ID is incorrect.");
      }

      const response = await userService.getUserInfor(userId);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể lấy thông tin người dùng"
      );
    }
  }
);

// Thunk cho cập nhật thông tin User
export const updateUserInfor = createAsyncThunk(
  AUTH_ACTIONS.UPDATE_USER,
  async (
    { userId, userInfor }: { userId: string; userInfor: UserUpdate },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.updateUserInfor(userId, userInfor);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Không thể cập nhật thông tin của người dùng."
      );
    }
  }
);

// Initial State
const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    addAuth: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
        action.payload.remember
          ? saveAuthData(action.payload)
          : saveAuthDataToSession(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
        const data = action.payload;
        if (data.refreshToken && data.token && data.data) {
          action.payload.remember
            ? saveAuthData({
                token: data.token,
                refreshToken: data.refreshToken,
                data: data.data,
              })
            : saveAuthDataToSession({
                token: data.token,
                refreshToken: data.refreshToken,
                data: data.data,
              });
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || "Đăng nhập thất bại";
      })
      .addCase(register.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || "Đăng kí thất bại";
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        logout();
      })
      .addCase(getUserInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
      })
      .addCase(updateUserInfor.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserInfor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
      })
      .addCase(updateUserInfor.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthStatus, addAuth } = authSlice.actions;
export default authSlice.reducer;
