import { MetaResponseUsers, User, UserRequest } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuth } from "@/api/axiosInstance";
import axios, { AxiosRequestConfig } from "axios";
import { saveUserFiltersQueryParams } from "./slice";

type UpdateUserArgs = {
  userData: UserRequest;
  userId: number;
};

export const getAllUsers = createAsyncThunk(
  "admin/users",
  async (userFiltersaRespons: AxiosRequestConfig, thunkAPI) => {
    try {
      const response = await apiAuth.get("admin/users", userFiltersaRespons);
      const data: MetaResponseUsers<User> = response.data;
      console.log("data THUNK", data);

      if (data.meta.totalAmount === 0) {
        thunkAPI.dispatch(saveUserFiltersQueryParams({}));
      }
      if (data.data === null) {
        return thunkAPI.rejectWithValue(
          `Имя ${userFiltersaRespons.params.search} не найдено в базе`
        );
      }
      thunkAPI.dispatch(
        saveUserFiltersQueryParams(userFiltersaRespons.params || {})
      );
      return data;
    } catch (error) {
      console.log("Ошибка запроса данных пользователя", error);
      throw error;
    }
  }
);

export const blocedkUser = createAsyncThunk(
  `/admin/users/id/block`,
  async (id: number) => {
    try {
      const response = await apiAuth.post(`/admin/users/${id}/block`);
      const data: User = response.data;

      return data;
    } catch (error) {
      console.log("Ошибка блокировки пользователя", error);
      throw error;
    }
  }
);

export const unBlocedkUser = createAsyncThunk(
  `/admin/users/id/block`,
  async (id: number) => {
    try {
      const response = await apiAuth.post(`/admin/users/${id}/unblock`);
      const data: User = response.data;

      return data;
    } catch (error) {
      console.log("Ошибка  разблокировки пользователя", error);
      throw error;
    }
  }
);

export const getUserPages = createAsyncThunk(
  `/admin/users/{id}`,
  async (id: number) => {
    try {
      const response = await apiAuth.get(`/admin/users/${id}`);
      const data: User = response.data;

      return data;
    } catch (error) {
      console.log("Ошибка  разблокировки пользователя", error);
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
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
          case 403:
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

export const updateUser = createAsyncThunk(
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
