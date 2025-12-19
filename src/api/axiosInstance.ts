import { API_URL } from "@/constants/constants.tsx";
import { tokenManager } from "@/ducks/TokenManager.ts";

import axios from "axios";

export const apiTodo = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
