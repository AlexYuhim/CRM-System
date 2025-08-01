import { API_URL } from "@/constants/constants";
import { tokenManager } from "@/ducks/TokenManager";
import {
  MetaResponse,
  TodoRequest,
  ITodo,
  TodoInfo,
  StatusWork,
} from "@/types/types";
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

export async function metaResponse(
  statusTodos: StatusWork
): Promise<MetaResponse<ITodo, TodoInfo>> {
  //получаем все данные
  try {
    const response = await apiTodo.get("/todos", {
      params: { filter: statusTodos },
    });
    const data: MetaResponse<ITodo, TodoInfo> = response.data;
    return data;
  } catch (error) {
    console.log("Ошибка запроса данных", error);
    throw error;
  }
}

export async function addTodo(todoRequest: TodoRequest) {
  //добавляем туду
  try {
    const response = await apiTodo.post("/todos", todoRequest);

    const data = response.data;
    return data;
  } catch (error) {
    console.log("ошибка добавления задачи", error);
  }
}

export async function deleteTodo(id: number) {
  //удаляем
  try {
    await apiTodo.delete(`/todos/${id}`);
  } catch (error) {
    console.log("ошибка удаления задачи", error);
  }
}

export async function updateTodo(id: number, todoRequest: TodoRequest) {
  //редактируем
  try {
    await apiTodo.put(`/todos/${id}`, todoRequest);
  } catch (error) {
    console.log("ошибка изменения записи", error);
  }
}
