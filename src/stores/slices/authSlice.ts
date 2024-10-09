import { AuthState } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

import {
  changePassword,
  login,
  logoutUser,
  register,
} from "../thunks/authThunk";

// Hàm để lấy trạng thái ban đầu từ localStorage
const getInitialState = (): AuthState => {
  const userId = localStorage.getItem("userId");
  return {
    userId,
    status: "idle",
    error: null,
  };
};

const initialState: AuthState = getInitialState();

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userId = null;
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
        state.userId = action.payload.data;
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.token)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(action.payload.refreshToken)
        );
        localStorage.setItem("userId", JSON.stringify(action.payload.data));
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
