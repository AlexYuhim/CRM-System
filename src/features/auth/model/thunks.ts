import { AuthData, Token, UserRegistration } from "@/types/types.tsx";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { AppThunkConfig } from "@/ducks/store.ts";
import { apiAuth } from "@/shared/api/axiosInstance.ts";
import { tokenManager } from "@/ducks/TokenManager.ts";

export const signUp = createAsyncThunk<
  UserRegistration,
  UserRegistration,
  AppThunkConfig
>("auth/signUp", async (dataRequest: UserRegistration, { rejectWithValue }) => {
  try {
    const response = await apiAuth.post("/auth/signup", dataRequest);

    const data: UserRegistration = response.data;

    return data;
  } catch (error) {
    console.log("error", error);

    if (axios.isAxiosError(error)) {
      switch (error.status) {
        case 400:
          return rejectWithValue(
            "Ошибка десериализации запроса или неверный ввод"
          );
        case 409:
          return rejectWithValue(
            "Пользователь с таким логином или почтой  уже существует"
          );
        case 500:
          return rejectWithValue("Внутренняя ошибка сервера.");
        default:
          return rejectWithValue("Неизвестная ошибка");
      }
    } else {
      return rejectWithValue("Ошибка сети или необработанная ошибка");
    }
  }
});

export const signIn = createAsyncThunk<Token, AuthData, AppThunkConfig>(
  "auth/signin",
  async (dataRequest: AuthData, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post("/auth/signin", dataRequest);

      const data: Token = response.data;

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 400:
            return rejectWithValue(
              "Ошибка десериализации запроса или неверный ввод"
            );
          case 401:
            return rejectWithValue("Неверные учетные данные.");
          case 500:
            return rejectWithValue("Внутренняя ошибка сервера.");
          default:
            return rejectWithValue("Неизвестная ошибка");
        }
      } else {
        return rejectWithValue("Ошибка сети или необработанная ошибка");
      }
    }
  }
);

export const refreshToken = createAsyncThunk<Token, void, AppThunkConfig>(
  "/auth/refresh",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      return;
    }
    try {
      const response = await apiAuth.post("/auth/refresh", { refreshToken });
      const data = response.data;
      return data;
    } catch (error) {
      tokenManager.clear();
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 400:
            return rejectWithValue("Ошибка десериализации запроса");
          case 401:
            return rejectWithValue("Неверные учетные данные или токен истек.");
          case 500:
            return rejectWithValue("Внутренняя ошибка сервера.");
          default:
            return rejectWithValue("Неизвестная ошибка");
        }
      } else {
        return rejectWithValue("Ошибка сети или необработанная ошибка");
      }
    }
  }
);

export const logOut = createAsyncThunk("/user/logout", async () => {
  try {
    await apiAuth.post("/user/logout");
  } catch (error) {
    console.log("Ошибка при выходе", error);
    throw error;
  }
});
