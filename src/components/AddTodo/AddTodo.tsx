import { FC } from "react";
import style from "./AddTodo.module.css";
import { addTodo } from "@/api/allFetch";
import { ITodoList } from "@/types/types";
import { Button, Form, Input } from "antd";

export const AddTodo: FC<ITodoList> = ({ getData }) => {
  const [form] = Form.useForm();

  //добавляю задачу
  async function handlerAddTodo(value: { todo_input: string }) {
    const todoRequest = {
      title: value.todo_input,
    };

    try {
      await addTodo(todoRequest);
      form.resetFields();
      if (getData) {
        getData();
      }
    } catch (error) {
      console.log("ошибка добавления задачи", error);
    }
  }

  return (
    <div className={style.input_field_wr}>
      <Form onFinish={handlerAddTodo} form={form}>
        <Form.Item
          name="todo_input"
          rules={[
            { required: true, message: "Введите задачу" },
            { min: 2, message: "Минимум 2 символа" },
            { max: 64, message: "Максимум 64 символов" },
          ]}
        >
          <Input title="введите задачу" showCount placeholder="add todo" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
