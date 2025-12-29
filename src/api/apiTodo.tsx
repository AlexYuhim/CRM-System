import {
  MetaResponse,
  TodoRequest,
  ITodo,
  TodoInfo,
  StatusWork,
} from "@/shared/types/types.tsx";
import { apiTodo } from "./axiosInstance.ts";

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
