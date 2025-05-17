import style from "./TodoList.module.css";
import { Todo } from "@/components/Todo/Todo";
import { ITodoList } from "@/types/types";
import { FC } from "react";

export const TodoList: FC<ITodoList> = ({ todoList, getData }) => {
  return (
    <div className={style.todoList_wr}>
      {todoList?.map((todo) => {
        return (
          <ul key={todo.id}>
            <li>
              <Todo todo={todo} getData={getData} />
            </li>
            <hr />
          </ul>
        );
      })}
    </div>
  );
};
