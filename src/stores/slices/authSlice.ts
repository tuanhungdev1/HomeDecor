/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthState, LoginData, ForgotPasswordFormValues } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/authService";
import { FieldSignUpType } from "@/pages/admin/SignUpAdminPage";
import {
  saveAuthData,
  saveAuthDataToSession,
  logout,
} from "@/utils/authHelper";

interface ErrorResponseType {
  success: boolean;
  message: string;
  statusCode: number;
  errors: any[];
}

interface SuccessResponseType {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

// Async Thunks
export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await authService.login(loginData);
      return { ...response.data, remember: loginData.rememberPassword };
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
>("auth/register", async (signUpForm: FieldSignUpType, { rejectWithValue }) => {
  try {
    const response = await authService.register(signUpForm);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Registration failed");
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
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
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue("Logout failed");
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.remember
          ? saveAuthData(action.payload)
          : saveAuthDataToSession(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
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
      });
  },
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
