import { API_URL } from "@/constants/constants";
import {
  MetaResponse,
  TodoRequest,
  ITodo,
  TodoInfo,
  StatusWork,
  UserRegistration,
  Profile,
  AuthData,
} from "@/types/types";
import axios from "axios";
import { Navigate } from "react-router-dom";

const instansCRUD = axios.create({
  baseURL: API_URL,
  headers: { accept: "application/json", "Content-Type": "application/json" },
});

export async function signIn(dataRequest: AuthData) {
  //Аутентификация пользователя
  try {
    const response = await instansCRUD.post("/auth/signin", dataRequest);
    const data: Profile = response.data;
    return data;
  } catch (error) {
    console.log("Ошибка Аутентификации", error);
    throw error;
  }
}

export async function signUp(dataRequest: UserRegistration) {
  //регистрация пользователя
  try {
    const response = await instansCRUD.post("/auth/signup", dataRequest);
    const data: Profile = response.data;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 409) {
          <Navigate to="/" />; // Перенаправление на страницу входа
        }
        return Promise.reject(error);
      }
    );
    return data;
  } catch (error) {
    // Другие ошибки
    throw error;
  }
}

export async function metaResponse(
  statusTodos: StatusWork
): Promise<MetaResponse<ITodo, TodoInfo>> {
  //получаем все данные
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
  //добавляем туду
  try {
    const response = await instansCRUD.post("/todos", todoRequest);

    const data = response.data;
    return data;
  } catch (error) {
    console.log("ошибка добавления задачи", error);
  }
}

export async function deleteTodo(id: number) {
  //удаляем
  try {
    await instansCRUD.delete(`/todos/${id}`);
  } catch (error) {
    console.log("ошибка удаления задачи", error);
  }
}

export async function updateTodo(id: number, todoRequest: TodoRequest) {
  //редактируем
  try {
    await instansCRUD.put(`/todos/${id}`, todoRequest);
  } catch (error) {
    console.log("ошибка изменения записи", error);
  }
}
