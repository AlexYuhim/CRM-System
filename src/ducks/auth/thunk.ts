import { AuthData, Token, UserRegistration } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { tokenManager } from "../TokenManager";
import { apiTodo } from "@/api/axiosInstance";
import axios from "axios";
import { clearError, setFormData, showPopUp, toggleForm } from "./slice";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (dataRequest: UserRegistration, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiTodo.post("/auth/signup", dataRequest);
      dispatch(toggleForm(false));
      dispatch(clearError());
      dispatch(showPopUp(true));
      const data: UserRegistration = response.data;
      dispatch(
        setFormData({
          login: "",
          username: "",
          password: "",
          email: "",
          phoneNumber: "",
        })
      );

      return data;
    } catch (error) {
      console.log("error", error);

      if (axios.isAxiosError(error)) {
        dispatch(toggleForm(true));
        if (error.status === 409) {
          dispatch(setFormData({ ...dataRequest, login: "", email: "" }));
          return rejectWithValue(
            "Пользователь с таким логином или почтой  уже существует"
          );
        }
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signin",
  async (dataRequest: AuthData, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiTodo.post("/auth/signin", dataRequest);
      dispatch(toggleForm(false));
      const data: Token = response.data;

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401)
          return rejectWithValue("неверный логин или пароль");
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "/auth/refresh",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      return;
    }
    try {
      const response = await apiTodo.post("/auth/refresh", { refreshToken });
      const data = response.data;
      return data;
    } catch (error) {
      tokenManager.clear();
      return rejectWithValue("Сеанс истек");
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async () => {
  try {
    const refreshToken = localStorage.getItem("refresh");
    await apiTodo.post("/user/logout", { refreshToken });
  } catch (error) {
    console.log("Ошибка при выходе", error);
    throw error;
  }
});
