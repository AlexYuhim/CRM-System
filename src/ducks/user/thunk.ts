import { Profile } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuth } from "@/api/axiosInstance";

export const getProfile = createAsyncThunk("user/profile", async () => {
  try {
    const response = await apiAuth.get("/user/profile");
    const data: Profile = response.data;

    return data;
  } catch (error) {
    console.log("Ошибка запроса данных профиля", error);
    throw error;
  }
});
