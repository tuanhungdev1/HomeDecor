import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
