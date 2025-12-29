import { TIME } from "@/shared/constants/constants.tsx";
import { ITodoList } from "@/shared/types/types.tsx";
import { List } from "antd";
import { FC, useEffect, useState } from "react";
import { Todo } from "../Todo/Todo.tsx";

export const TodoList: FC<ITodoList> = ({ todoList, getData }) => {
  const [interval, setInterval] = useState<number | undefined>();
  // обнавляем список задач здесь
  useEffect(() => {
    const id = window.setInterval(getData, TIME);
    setInterval(id);
    return () => {
      window.clearInterval(id);
    };
  }, []);

  return (
    <List
      bordered
      size="large"
      dataSource={todoList}
      renderItem={(item) => (
        <List.Item>
          <Todo todo={item} getData={getData} intervalUpdate={interval} />
        </List.Item>
      )}
    />
  );
};
