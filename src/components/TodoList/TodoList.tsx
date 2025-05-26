import { Todo } from "@/components/Todo/Todo";
import { ITodoList } from "@/types/types";
import { List } from "antd";
import { FC } from "react";

export const TodoList: FC<ITodoList> = ({ todoList, getData }) => {
  return (
    <List
      bordered
      size="large"
      dataSource={todoList}
      renderItem={(item) => (
        <List.Item>
          <Todo todo={item} getData={getData} />
        </List.Item>
      )}
    />
  );
};
