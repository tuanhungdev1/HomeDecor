import { UserState } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

import { getUserInfor, updateUserInfor } from "../thunks/userThunk";

// Hàm để lấy trạng thái ban đầu từ localStorage
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
      .addCase(getUserInfor.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserInfor.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(getUserInfor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
      })
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
