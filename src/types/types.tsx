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

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
