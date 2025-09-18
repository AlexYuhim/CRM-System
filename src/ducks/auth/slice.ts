import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logOut, refreshToken, signIn, signUp } from "./thunk";
import { tokenManager } from "../TokenManager";
import { UserRegistration } from "@/types/types";

interface Auth {
  refreshToken?: string;
  authenticated?: boolean;
  isLoading?: boolean;
  error?: string | null;
  formData?: UserRegistration;
}

const initialState: Auth = {
  refreshToken: localStorage.getItem("refresh") || undefined,
  authenticated: false,
  isLoading: false,
  error: null,
};
// создаем slice который будет хранить состояние об авторизации
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // обработка синхронщины
  },
  extraReducers(builder) {
    // обработка асинхронщины
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.authenticated = false;
        tokenManager.clear();
        localStorage.setItem("refresh", "undefined");
        state.isLoading = false;
      })
      .addMatcher(
        (action) =>
          signIn.fulfilled.match(action) ||
          refreshToken.fulfilled.match(action),
        (state, action) => {
          tokenManager.setAccessToken(action.payload.accessToken);
          localStorage.setItem("refresh", action.payload.refreshToken);
          state.authenticated = true;
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) =>
          logOut.fulfilled.match(action) || logOut.rejected.match(action),
        (state) => {
          state.authenticated = false;
          tokenManager.clear();
          localStorage.setItem("refresh", "undefined");
        }
      );
  },
});
