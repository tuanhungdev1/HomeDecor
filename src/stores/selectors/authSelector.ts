import { RootState } from "../store";
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuth = (state: RootState) => state.auth;
