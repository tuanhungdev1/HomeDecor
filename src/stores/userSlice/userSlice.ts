import { userService } from "@/services/userService";
import { UserState, UserUpdate } from "@/types/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// Hàm để lấy trạng thái ban đầu từ localStorage
const getInitialState = (): UserState => {
  const storedUser = localStorage.getItem("user");
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    status: "idle",
    error: null,
  };
};

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

const initialState: UserState = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfor.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserInfor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(updateUserInfor.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
