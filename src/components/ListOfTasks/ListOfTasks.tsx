import { ListOfTasksPros } from "@/types/types";
import { FC } from "react";
import { Radio, Flex } from "antd";
export const ListOfTasks: FC<ListOfTasksPros> = ({
  countTodos,
  setStatusTodos,
  statusTodos,
}) => {
  return (
    <Flex vertical>
      <Radio.Group
        block
        value={statusTodos}
        optionType="button"
        buttonStyle="solid"
        onChange={(e) => setStatusTodos(e.target.value)}
        style={{ display: "flex", gap: "20px" }}
      >
        <Radio.Button value={"all"}>All : {countTodos.all}</Radio.Button>
        <Radio.Button value={"completed"}>
          completed : {countTodos.completed}
        </Radio.Button>
        <Radio.Button value={"inWork"}>
          inWork : {countTodos.inWork}
        </Radio.Button>
      </Radio.Group>
    </Flex>
  );
};
