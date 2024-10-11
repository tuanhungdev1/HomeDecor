import { AuthState } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

import { authService } from "@/services/authService";
import {
  ForgotPasswordFormValues,
  LoginData,
  RegisterData,
} from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  isAuthenticated,
  logout,
  saveAuthData,
  saveAuthDataToSession,
} from "@/utils/authHelper";

export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await authService.login(loginData);
      return {
        ...response.data,
        remember: loginData.rememberPassword,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        }
      } else {
        return rejectWithValue("An error occurred. Please try again.");
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(registerData);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        }
      } else {
        return rejectWithValue("An error occurred. Please try again.");
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (changePasswordData: ForgotPasswordFormValues, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(changePasswordData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else {
        return rejectWithValue("An error occurred. Please try again.");
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        }
      } else {
        return rejectWithValue("An error occurred. Please try again.");
      }
    }
  }
);

// Hàm để lấy trạng thái ban đầu từ localStorage
const getInitialState = (): AuthState => {
  const localUserId = localStorage.getItem("userId");
  const sessionUserId = sessionStorage.getItem("userId");
  return {
    isAuthentication: isAuthenticated(),
    userId: localUserId || sessionUserId || null,
    status: "idle",
    error: null,
    remember: Boolean(localUserId),
  };
};

const initialState: AuthState = getInitialState();

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
        state.userId = action.payload.data;
        state.isAuthentication = true;
        if (action.payload.remember) {
          saveAuthData(action.payload);
        } else {
          saveAuthDataToSession(action.payload);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.isAuthentication = false;
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
        state.error =
          (action.payload as string) || "Invalid username or password.";
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "pending";
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "rejected";
        state.error =
          (action.payload as string) || "Invalid username or password.";
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "pending";
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.userId = null;
        state.isAuthentication = false;
        state.error = null;
        logout();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
