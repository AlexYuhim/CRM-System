import { API_URL } from "@/constants/constants";
import { tokenManager } from "@/ducks/TokenManager";

import axios from "axios";

export const apiTodo = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

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
