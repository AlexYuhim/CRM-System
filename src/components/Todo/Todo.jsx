import style from './Todo.module.css';
import { useState } from 'react';
import { REGEXP_VALIDATE_TODO_TITLE } from '@/constants/constants';
import { fetchDeleteTodo, fetchUpdateTodo } from '@/api/allFetch';

export function Todo({ todo, getData, idEditTodo, setidEditTodo }) {
  const { title, id, isDone } = todo;

  const [editValue, setEditValue] = useState('');

  //редактирование задачи
  const handlerEditTodo = (title, id) => {
    if (idEditTodo !== id) {
      setidEditTodo(id);
      setEditValue(title);
    }
  };

  function handlerOnChangeEditTodo(event) {
    setEditValue(event);
  }

  // сброс редактирования
  function cancelTodoEdit() {
    setidEditTodo(null);
  }

  // отправляю изменения задачи на сервер

  async function saveTodo(event) {
    event.preventDefault();

    if (!REGEXP_VALIDATE_TODO_TITLE.test(editValue.trim())) {
      alert('Строка должна содержать от 2 до 64  символов ');
      return;
    }

    const objToSend = {
      title: editValue,
    };
    try {
      await fetchUpdateTodo(id, objToSend);
      getData();
    } catch (error) {
      console.log('ошибка изменения записи', error);
    }
  }

  //удаляю задачу

  async function deleteTodo(id) {
    try {
      await fetchDeleteTodo(id);

      getData();
    } catch (error) {
      console.log('ошибка удаления задачи', error);
    }
  }

  // переключение задачи между статуами (выполнено / в работе)

  async function toggleStatusTodo(id, isDone) {
    const objToSend = {
      isDone: !isDone,
    };

    try {
      await fetchUpdateTodo(id, objToSend);
      getData();
    } catch (error) {
      console.log('ошибка изменения записи', error);
    }
  }

  return (
    <>
      {idEditTodo === id ? (
        <form onSubmit={saveTodo}>
          <div className={style.edit} key={id}>
            <input type="checkbox" disabled checked={isDone} />
            <input
              autoFocus
              value={editValue}
              type="text"
              onChange={(e) => handlerOnChangeEditTodo(e.target.value)}
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

          <button type="button" onClick={() => handlerEditTodo(title, id)}>
            edit
          </button>
          <button type="button" onClick={() => deleteTodo(id)}>
            del
          </button>
        </div>
      )}
    </>
  );
}
