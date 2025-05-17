import { API_URL } from "@/constants/constants";
import {
  MetaResponse,
  TodoRequest,
  ITodo,
  TodoInfo,
  StatusWork,
} from "@/types/types";

export async function metaResponse(
  statusTodos: StatusWork
): Promise<MetaResponse<ITodo, TodoInfo>> {
  try {
    const response = await fetch(`${API_URL}?filter=${statusTodos}`);

    const data: MetaResponse<ITodo, TodoInfo> = await response.json();
    return data;
  } catch (error) {
    console.log("Ошибка запроса данных", error);
    throw error;
  }
}

export async function addTodo(todoRequest: TodoRequest) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(todoRequest),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ошибка добавления задачи", error);
  }
}

export async function deleteTodo(id: number) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("ошибка удаления задачи", error);
  }
}

export async function updateTodo(id: number, todoRequest: TodoRequest) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(todoRequest),
    });
  } catch (error) {
    console.log("ошибка изменения записи", error);
  }
}
