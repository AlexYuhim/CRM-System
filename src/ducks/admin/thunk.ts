import {
  MetaResponseUsers,
  User,
  UserRequest,
  UserRolesRequest,
} from "@/types/types.tsx";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosRequestConfig } from "axios";
import { AppThunkConfig } from "../store.ts";
import { apiAuth } from "@/shared/api/axiosInstance.ts";
import { saveUserFiltersQueryParams } from "./slice.ts";

type UpdateUserArgs = {
  userData: UserRequest;
  userId: number;
};
type UpdateUserRolesArgs = {
  userData: UserRolesRequest;
  userId: number;
};

export const getAllUsers = createAsyncThunk<
  MetaResponseUsers<User>,
  AxiosRequestConfig,
  AppThunkConfig
>("admin/users", async (requestConfig: AxiosRequestConfig, thunkAPI) => {
  try {
    const response = await apiAuth.get("admin/users", requestConfig);
    const data: MetaResponseUsers<User> = response.data;

    if (data.meta.totalAmount === 0) {
      thunkAPI.dispatch(saveUserFiltersQueryParams({}));
    }
    if (data.data === null) {
      return thunkAPI.rejectWithValue(
        `Имя ${requestConfig.params?.search || "не указанно"} не найдено в базе`
      );
    }
    thunkAPI.dispatch(saveUserFiltersQueryParams(requestConfig.params || {}));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.status) {
        case 401:
          return thunkAPI.rejectWithValue(
            "Несанкционированный доступ. Токен-носитель отсутствует или недействителен."
          );
        case 403:
          return thunkAPI.rejectWithValue("Недостаточно прав.");
        case 500:
          return thunkAPI.rejectWithValue("Внутренняя ошибка сервера.");
        default:
          return thunkAPI.rejectWithValue("Неизвестная ошибка");
      }
    } else {
      return thunkAPI.rejectWithValue("Ошибка сети или необработанная ошибка");
    }
  }
});

export const blockedUser = createAsyncThunk<User, number, AppThunkConfig>(
  `/admin/users/block`,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post(`/admin/users/${id}/block`);
      const data: User = response.data;

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 400:
            return rejectWithValue(
              "Неверный или отсутствующий идентификатор пользователя."
            );
          case 404:
            return rejectWithValue("Пользователь не найден.");
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

export const unBlockedUser = createAsyncThunk<User, number, AppThunkConfig>(
  `/admin/users/unblock`,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post(`/admin/users/${id}/unblock`);
      const data: User = response.data;

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 400:
            return rejectWithValue(
              "Неверный или отсутствующий идентификатор пользователя."
            );
          case 404:
            return rejectWithValue("Пользователь не найден.");
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

export const getUserPages = createAsyncThunk<User, number, AppThunkConfig>(
  `/admin/users/{id}`,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await apiAuth.get(`/admin/users/${id}`);
      const data: User = response.data;

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 400:
            return rejectWithValue(
              "Неверный или отсутствующий идентификатор пользователя."
            );
          case 401:
            return rejectWithValue(
              "Несанкционированный доступ. Токен-носитель отсутствует или недействителен."
            );
          case 403:
            return rejectWithValue("Недостаточно прав.");
          case 404:
            return rejectWithValue("Пользователь не найден.");
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

export const deleteUser = createAsyncThunk<void, number, AppThunkConfig>(
  `/admin/users/{id}`,
  async (id: number, { rejectWithValue }) => {
    try {
      await apiAuth.delete(`/admin/users/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 400:
            return rejectWithValue(
              "Неверный или отсутствующий идентификатор пользователя."
            );
          case 401:
            return rejectWithValue(
              "Несанкционированный доступ. Токен-носитель отсутствует или недействителен."
            );
          case 403:
            return rejectWithValue("Недостаточно прав.");
          case 404:
            return rejectWithValue("Пользователь не найден.");
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

export const updateUser = createAsyncThunk<
  void,
  UpdateUserArgs,
  AppThunkConfig
>(
  "/admin/users/updateUser",
  async ({ userData, userId }: UpdateUserArgs, { rejectWithValue }) => {
    try {
      await apiAuth.put(`/admin/users/${userId}`, userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 400:
            return rejectWithValue(
              "Ошибка, логин или адрес электронной почты уже существует."
            );
          case 401:
            return rejectWithValue(
              "Несанкционированный доступ. Токен-носитель отсутствует или недействителен."
            );
          case 403:
            return rejectWithValue("Недостаточно прав.");
          case 404:
            return rejectWithValue("Пользователь не найден.");
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

export const updateRolesUser = createAsyncThunk<
  void,
  UpdateUserRolesArgs,
  AppThunkConfig
>(
  "/admin/users/updateRolesUser",
  async ({ userData, userId }: UpdateUserRolesArgs, { rejectWithValue }) => {
    try {
      await apiAuth.post(`/admin/users/${userId}/rights`, userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 400:
            return rejectWithValue("Такого поля нет.");
          case 404:
            return rejectWithValue("Пользователь не найден.");
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
