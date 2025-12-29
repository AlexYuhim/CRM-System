import { API_URL } from "@/shared/constants/constants.tsx";

import axios from "axios";

export const apiTodo = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
