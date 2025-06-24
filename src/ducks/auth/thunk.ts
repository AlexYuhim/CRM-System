import { API_URL } from "@/constants/constants";
import { AuthData, Profile, Token, UserRegistration } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { accept: "application/json", "Content-Type": "application/json" },
});

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (dataRequest: UserRegistration) => {
    try {
      const response = await apiClient.post("/auth/signup", dataRequest);
      const data: Profile = response.data;

      return data;
    } catch (error) {
      console.log("Ошибка Регистрации", error);
      throw error;
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signin",
  async (dataRequest: AuthData) => {
    console.log("dataRequest", dataRequest);

    try {
      const response = await apiClient.post("/auth/signin", dataRequest);
      const data: Token = response.data;
      return data;
    } catch (error) {
      console.log("Ошибка Аутентификации", error);
      throw error;
    }
  }
);
