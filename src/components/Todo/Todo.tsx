import style from "./Todo.module.css";
import React, { FC, useState } from "react";
import { deleteTodo, updateTodo } from "@/api/axiosInstance";
import { ITodo } from "@/types/types";
import { Button, Col, Form, Input, Row } from "antd";
import { VALIDATE_CHAR_TODO } from "@/constants/constants";

const { MIN, MAX } = VALIDATE_CHAR_TODO;

export interface ITodoProps {
  intervalUpdate?: number | undefined;
  todo: ITodo;
  getData: () => Promise<void>;
}

export const Todo: FC<ITodoProps> = ({ todo, getData, intervalUpdate }) => {
  const { title, id, isDone } = todo;

  const [isEdit, setIsEdit] = useState(false);

  const [editValue, setEditValue] = useState("");

  //редактирование задачи, остановка обнавления
  const handlerEditTodo = (title: string) => {
    clearInterval(intervalUpdate);
    setEditValue(title);
    setIsEdit(true);
  };

  function handlerOnChangeEditTodo(event: React.ChangeEvent<HTMLInputElement>) {
    setEditValue(event.target.value);
  }

  // сброс редактирования, перерендер компонента
  function cancelTodoEdit() {
    setIsEdit(false);
    getData();
  }

  // отправляю изменения задачи на сервер

  async function saveTodo() {
    const todoRequest = {
      title: editValue,
    };
    try {
      await updateTodo(id, todoRequest);
      if (getData) {
        getData();
      }
    } catch (error) {
      console.log("ошибка изменения записи", error);
    }
  }

  //удаляю задачу

  async function handlerDeleteTodo(id: number) {
    try {
      await deleteTodo(id);

      if (getData) {
        getData();
      }
    } catch (error) {
      console.log("ошибка удаления задачи", error);
    }
  }

  // переключение задачи между статуами (выполнено / в работе)

  async function toggleStatusTodo(id: number, isDone: boolean) {
    const todoRequest = {
      isDone: !isDone,
    };

    try {
      await updateTodo(id, todoRequest);
      if (getData) {
        getData();
      }
    } catch (error) {
      console.log("ошибка изменения записи", error);
    }
  }

  return (
    <>
      {isEdit ? (
        <Form onFinish={saveTodo}>
          <Row gutter={20} justify="space-between">
            <Col flex="50px">
              <Form.Item>
                <Input type="checkbox" disabled checked={isDone} />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item
                name={"edit_input"}
                initialValue={editValue}
                rules={[
                  { min: MIN, message: `Минимум ${MIN} символа` },
                  { max: MAX, message: `Максимум ${MAX} символов` },
                ]}
              >
                <Input
                  autoFocus
                  type="text"
                  onChange={handlerOnChangeEditTodo}
                />
              </Form.Item>
            </Col>

            <Col flex="100px">
              <Button htmlType="submit" color="cyan" variant="solid">
                save
              </Button>
            </Col>
            <Col flex="100px">
              <Button onClick={cancelTodoEdit} color="default" variant="filled">
                cancel
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <Row gutter={20} justify="space-between" key={id}>
          <Col flex="50px">
            <Input
              readOnly
              checked={isDone}
              type="checkbox"
              onClick={() => toggleStatusTodo(id, isDone)}
            />
          </Col>
          <Col flex="auto">
            <div className={isDone ? style.completed_todo : undefined}>
              {title}
            </div>
          </Col>
          <Col flex="100px">
            <Button type="primary" onClick={() => handlerEditTodo(title)}>
              edit
            </Button>
          </Col>
          <Col flex="100px">
            <Button
              color="danger"
              variant="solid"
              onClick={() => handlerDeleteTodo(id)}
            >
              del
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};
