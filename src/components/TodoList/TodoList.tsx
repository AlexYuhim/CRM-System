import { Todo } from "@/components/Todo/Todo";
import { ITodoList } from "@/types/types";
import { FC } from "react";

export const TodoList: FC<ITodoList> = ({ todoList, getData }) => {
  return (
    <div>
      {todoList?.map((todo) => {
        return (
          <div key={todo.id}>
            <Todo todo={todo} getData={getData} />
            <hr />
          </div>
        );
      })}
    </div>
  );
};
