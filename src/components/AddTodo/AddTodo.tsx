import { FC } from "react";
import { addTodo } from "@/api/allFetch";
import { ITodoList } from "@/types/types";
import { REGEXP_VALIDATE_TODO_TITLE } from "@/constants/constants";
import { Button, Form, Input, Row, Col } from "antd";

interface FormValueProp {
  todo_input: string;
}

export const AddTodo: FC<ITodoList> = ({ getData }) => {
  const [form] = Form.useForm();
  //добавляю задачу
  async function handlerAddTodo(value: FormValueProp) {
    if (!REGEXP_VALIDATE_TODO_TITLE.test(value.todo_input.trim())) {
      alert(
        "Строка должна содержать от 2 до 64  символов, не начинасть с пробела  "
      );
      return;
    }
    const todoRequest = {
      title: value.todo_input.trim(),
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
    <Form onFinish={handlerAddTodo} form={form}>
      <Row gutter={24}>
        <Col flex="70%">
          <Form.Item
            name="todo_input"
            rules={[
              { required: true, message: "Введите название задачи" },
              { min: 2, message: "Минимум 2 символа" },
              { max: 64, message: "Максимум 64 символов" },
            ]}
          >
            <Input title="введите задачу" showCount placeholder="add todo" />
          </Form.Item>
        </Col>

        <Col flex="30%">
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              add
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
