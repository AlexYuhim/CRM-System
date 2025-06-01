import { API_URL } from "@/constants/constants";
import {
  MetaResponse,
  TodoRequest,
  ITodo,
  TodoInfo,
  StatusWork,
} from "@/types/types";
import axios from "axios";

const instansCRUD = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export async function metaResponse(
  statusTodos: StatusWork
): Promise<MetaResponse<ITodo, TodoInfo>> {
  try {
    const response = await instansCRUD.get("/todos", {
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
  try {
    const response = await instansCRUD.post("/todos", todoRequest);

    const data = response.data;
    return data;
  } catch (error) {
    console.log("ошибка добавления задачи", error);
  }
}

export async function deleteTodo(id: number) {
  try {
    await instansCRUD.delete(`/todos/${id}`);
  } catch (error) {
    console.log("ошибка удаления задачи", error);
  }
}

export async function updateTodo(id: number, todoRequest: TodoRequest) {
  try {
    await instansCRUD.put(`/todos/${id}`, todoRequest);
  } catch (error) {
    console.log("ошибка изменения записи", error);
  }
}
