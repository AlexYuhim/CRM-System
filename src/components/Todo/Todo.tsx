import style from "./Todo.module.css";
import React, { FC, useState } from "react";
import { REGEXP_VALIDATE_TODO_TITLE } from "@/constants/constants";
import { fetchDeleteTodo, fetchUpdateTodo } from "@/api/allFetch";
import { ITodoProps } from "@/types/types";

export const Todo: FC<ITodoProps> = ({ todo, getData }) => {
  const { title, id, isDone } = todo;

  const [isEdit, setIsEdit] = useState(false);

  const [editValue, setEditValue] = useState("");

  //редактирование задачи
  const handlerEditTodo = (title: string) => {
    setEditValue(title);
    setIsEdit(true);
  };

  function handlerOnChangeEditTodo(event: React.ChangeEvent<HTMLInputElement>) {
    setEditValue(event.target.value);
  }

  // сброс редактирования
  function cancelTodoEdit() {
    setIsEdit(false);
  }

  // отправляю изменения задачи на сервер

  async function saveTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!REGEXP_VALIDATE_TODO_TITLE.test(editValue.trim())) {
      alert("Строка должна содержать от 2 до 64  символов ");
      return;
    }

    const objToSend = {
      title: editValue,
    };
    try {
      await fetchUpdateTodo(id, objToSend);
      if (getData) getData();
    } catch (error) {
      console.log("ошибка изменения записи", error);
    }
  }

  //удаляю задачу

  async function deleteTodo(id: number) {
    try {
      await fetchDeleteTodo(id);

      if (getData) getData();
    } catch (error) {
      console.log("ошибка удаления задачи", error);
    }
  }

  // переключение задачи между статуами (выполнено / в работе)

  async function toggleStatusTodo(id: number, isDone: boolean) {
    const objToSend = {
      isDone: !isDone,
    };

    try {
      await fetchUpdateTodo(id, objToSend);
      if (getData) getData();
    } catch (error) {
      console.log("ошибка изменения записи", error);
    }
  }

  return (
    <>
      {isEdit ? (
        <form onSubmit={saveTodo}>
          <div className={style.edit} key={id}>
            <input type="checkbox" disabled checked={isDone} />
            <input
              autoFocus
              value={editValue}
              type="text"
              onChange={handlerOnChangeEditTodo}
            />
            <button type="submit">save</button>
            <button type="button" onClick={() => cancelTodoEdit()}>
              cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={style.todo_wr} key={id}>
          <input
            readOnly
            checked={isDone}
            type="checkbox"
            onClick={() => toggleStatusTodo(id, isDone)}
          />
          <div className={isDone ? style.completed_todo : undefined}>
            {title}
          </div>

          <button type="button" onClick={() => handlerEditTodo(title)}>
            edit
          </button>
          <button type="button" onClick={() => deleteTodo(id)}>
            del
          </button>
        </div>
      )}
    </>
  );
};
