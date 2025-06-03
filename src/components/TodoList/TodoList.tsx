import { Todo } from "@/components/Todo/Todo";
import { ITodoList } from "@/types/types";
import { List } from "antd";
import { FC, useEffect, useState } from "react";
import { TIME } from "@/constants/constants";

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
