import { API_URL } from "@/constants/constants";
import { MetaResponse, ObjToSend, ITodo, TodoInfo } from "@/types/types";

export async function featchGetTodos(
  statusTodos: string
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

export async function fetchAddTodo(objToSend: ObjToSend) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(objToSend),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ошибка добавления задачи", error);
  }
}

export async function fetchDeleteTodo(id: number) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("ошибка удаления задачи", error);
  }
}

export async function fetchUpdateTodo(id: number, objToSend: ObjToSend) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(objToSend),
    });
  } catch (error) {
    console.log("ошибка изменения записи", error);
  }
}
