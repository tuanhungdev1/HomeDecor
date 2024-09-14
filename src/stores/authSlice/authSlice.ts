import { authService } from "@/services/authService";
import {
  AuthState,
  ForgotPasswordFormValues,
  LoginData,
  RegisterData,
} from "@/types/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: "idle",
  error: null,
};

// Thunk cho đăng nhập
export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await authService.login(loginData);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        }
      } else {
        return rejectWithValue("An error occurred. Please try again.");
      }
    }
  }
);

// Thunk cho đăng ký
export const register = createAsyncThunk(
  "auth/register",
  async (registerData: RegisterData) => {
    const response = await authService.register(registerData);
    return response.data;
  }
);

// Thunk cho thay đổi mật khẩu
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (changePasswordData: ForgotPasswordFormValues) => {
    const response = await authService.changePassword(changePasswordData);
    return response.data;
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.isAuthenticated = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    resetAuthStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.data;
        localStorage.setItem("accessToken", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error =
          (action.payload as string) || "Invalid username or password.";
      })
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || null;
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "pending";
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || null;
      });
  },
});

export const { logout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthIsAuthentication = (state: RootState) =>
  state.auth.isAuthenticated;
