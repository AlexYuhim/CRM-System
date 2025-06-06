import { FC } from "react";
import { addTodo } from "@/api/api.crud";
import { ITodoList } from "@/types/types";
import { VALIDATE_CHAR } from "@/constants/constants";
import { Button, Form, Input, Row, Col } from "antd";

const { MIN, MAX } = VALIDATE_CHAR;

interface FormValueProp {
  inputAddTask: string;
}

export const AddTodo: FC<ITodoList> = ({ getData }) => {
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
