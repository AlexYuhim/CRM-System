import { API_URL } from "@/shared/constants/constants.tsx";
import { tokenManager } from "@/ducks/TokenManager.ts";

import axios from "axios";

export const apiAuth = axios.create({
  baseURL: API_URL,
  headers: { accept: "application/json", "Content-Type": "application/json" },
});
//перехваываю запрос и автоматически подставляю заголовок Authorization = `Bearer ${token}`
apiAuth.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
