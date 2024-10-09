import { userService } from "@/services/userService";
import { UserUpdate } from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk cho GET thông tin USER
export const getUserInfor = createAsyncThunk(
  "user/getInfor",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const response = await userService.getUserInfor(userId);
        return response.data;
      }
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

// Thunk cho cập nhật thông tin User
export const updateUserInfor = createAsyncThunk(
  "user/updateUserInfor",
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
