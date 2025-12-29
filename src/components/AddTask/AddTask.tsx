import { FC } from "react";

import { Button, Form, Input, Row, Col } from "antd";
import { VALIDATE_CHAR_TODO } from "@/shared/constants/constants.tsx";
import { ITodoList } from "@/shared/types/types.tsx";
import { addTodo } from "@/api/apiTodo.tsx";

const { MIN, MAX } = VALIDATE_CHAR_TODO;

interface FormValueProp {
  inputAddTask: string;
}

export const AddTasck: FC<ITodoList> = ({ getData }) => {
  const [form] = Form.useForm();

  //добавляю задачу
  async function handlerAddTodo(value: FormValueProp) {
    const todoRequest = {
      title: value.inputAddTask.trim(),
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
            name="inputAddTask"
            rules={[
              { required: true, message: "Введите название задачи" },
              { min: MIN, message: `Минимум ${MIN} символа` },
              { max: MAX, message: `Максимум ${MAX} символов` },
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
