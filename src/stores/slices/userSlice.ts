// src/slices/userSlice.ts
import { UserState } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

import { userService } from "@/services/userService";
import { UserUpdate } from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const USER_ACTIONS = {
  GET_USER_INFO: "user/getInfor",
  UPDATE_USER_INFO: "user/updateUserInfor",
};

export const getUserInfo = createAsyncThunk(
  USER_ACTIONS.GET_USER_INFO,
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return rejectWithValue("User ID not found in localStorage.");
      }

      const response = await userService.getUserInfor(userId);
      return response.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        }
        return rejectWithValue("An error occurred while fetching user info.");
      } else {
        return rejectWithValue(
          "An unexpected error occurred. Please try again."
        );
      }
    }
  }
);

// Thunk cho cập nhật thông tin User
export const updateUserInfor = createAsyncThunk(
  USER_ACTIONS.UPDATE_USER_INFO,
  async (
    { userId, userInfor }: { userId: string; userInfor: UserUpdate },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.updateUserInfor(userId, userInfor);
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

const getInitialState = (): UserState => {
  return {
    user: null,
    status: "idle",
    error: null,
  };
};

const initialState: UserState = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
        console.log(action);
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        console.log(action.payload);
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

export default userSlice.reducer;
