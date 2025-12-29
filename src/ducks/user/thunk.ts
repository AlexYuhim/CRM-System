import { apiAuth } from "@/shared/api/http-auth/axiosInstance.ts";
import { Profile } from "@/shared/types/types.tsx";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk<Profile, void>(
  "user/profile",
  async () => {
    try {
      const response = await apiAuth.get("/user/profile");
      const data: Profile = response.data;

      return data;
    } catch (error) {
      console.log("Ошибка запроса данных профиля", error);
      throw error;
    }
  }
);
