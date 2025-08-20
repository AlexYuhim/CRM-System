export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export interface ITodo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface ListOfTasksPros {
  countTodos: TodoInfo;
  setStatusTodos: (str: StatusWork) => void;
  statusTodos: string;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export type StatusWork = "all" | "completed" | "inWork";

export interface ITodoList {
  todoList?: ITodo[];
  getData: () => Promise<void>;
}

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

type Role = "ADMIN" | "USER" | "MODERATOR";

export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
  isLoaded?: boolean;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean | string;
  roles: Roles[];
  phoneNumber: string;
}

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number;
  offset?: number;
}

export interface MetaResponseUsers<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}

export interface UserRequest {
  id?: number;
  username?: string;
  email?: string;
  phoneNumber?: string;
}
