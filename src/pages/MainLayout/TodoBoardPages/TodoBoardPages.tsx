import { useEffect, useRef, useState } from "react";
import style from "./TodoBoardPages.module.css";
import { metaResponse } from "@/api/axiosInstance";
import { AddTodo } from "@/components/AddTodo/AddTodo";
import { ListOfTasks } from "@/components/ListOfTasks/ListOfTasks";
import { TodoList } from "@/components/TodoList/TodoList";
import { StatusWork, TodoInfo, ITodo } from "@/types/types";

export function TodoBoardPages() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [statusTodos, setStatusTodos] = useState<StatusWork>("all");
  const [countTodos, setCountTodos] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  // отслеживаем изминение статуса списка задач
  useEffect(() => {
    getData();
  }, [statusTodos]);

  // получаю список задач в зависимости от статуса задачи
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await metaResponse(statusTodos);

      if (data.info) {
        setCountTodos(data.info);
      }

      setTodoList(data.data);
    } catch (error) {
      console.log("Ошибка запроса данных", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.board_todo}>
      <h2>доска для размещения todo</h2>
      <ListOfTasks
        countTodos={countTodos}
        statusTodos={statusTodos}
        setStatusTodos={setStatusTodos}
      />
      <div className={style.group_input_ouyput}>
        <AddTodo getData={getData} />
        {isLoading ? (
          "Loading..."
        ) : (
          <TodoList todoList={todoList} getData={getData} />
        )}
      </div>
    </div>
  );
}
