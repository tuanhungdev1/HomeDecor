import { RootState } from "../store";

export const selectAuthUserId = (state: RootState) => state.auth.userId;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
