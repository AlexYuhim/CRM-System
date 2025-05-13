export type ObjToSend = {
  title?: string;
  isDone?: boolean;
};

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

export interface ITodoProps {
  todo: ITodo;
  getData: () => Promise<void>;
}
