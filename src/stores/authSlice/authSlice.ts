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

// Hàm để lấy trạng thái ban đầu từ localStorage
const getInitialState = (): AuthState => {
  const storedUser = localStorage.getItem("user");
  const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
  return {
    isAuthenticated: storedIsAuthenticated
      ? JSON.parse(storedIsAuthenticated)
      : false,
    user: storedUser ? JSON.parse(storedUser) : null,
    status: "idle",
    error: null,
  };
};

const initialState: AuthState = getInitialState();

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

export const register = createAsyncThunk(
  "auth/register",
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(registerData);
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
      const response = await authService.logout();
      console.log(response);
      return response;
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

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.token)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(action.payload.refreshToken)
        );
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
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
        console.log("pendding");
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        console.log("succeeded");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "rejected";
        console.log("rejected", action.payload);
        state.error =
          (action.payload as string) || "Invalid username or password.";
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
