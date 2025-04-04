import { ComponentEditTodo } from '../ComponentEditTodo/ComponentEditTodo';
import { ComponentTodo } from '../ComponentTodo/ComponentTodo';
import { allFetch } from '../../fetchApi/allFetch';
import { useState } from 'react';
import { CONSTANTS } from '../../constants/constants';
const { REGEXP_VALIDATE_INPUT } = CONSTANTS;
const { fetchDeleteTodo, fetchSaveTodo, fetchToggleStatusTodo } = allFetch;

export function ComponentTodoList({ todoList, getData, setTodoList }) {
  const [editValue, setEditValue] = useState('');
  const [idForEditValue, setIdForEditValue] = useState('');

  // добавляю флаг в объект для редактирования задачи
  const handlerEditTodo = (id, title) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isEdit: true } : todo
      )
    );
    setEditValue(title);
    setIdForEditValue(id);
  };

  function handlerOnChangeEditTodo(e) {
    setEditValue(e);
  }

  // сброс редактирования
  function cancelTodoEdit() {
    getData();
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
      await fetchToggleStatusTodo(id, objToSend);
      getData();
    } catch (error) {
      console.log('ошибка изменения записи', error);
    }
  }

  // отправляю изменения задачи на сервер

  async function saveTodo(id) {
    if (!REGEXP_VALIDATE_INPUT.test(editValue.trim())) {
      alert('Строка должна содержать от 2 до 64  символов ');
      return;
    }

    const objToSend = {
      title: editValue,
    };

    try {
      await fetchSaveTodo(id, objToSend);
      getData();
    } catch (error) {
      console.log('ошибка изменения записи', error);
    }
  }

  return (
    <div>
      {todoList.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.isEdit && todo.id === idForEditValue ? (
              <ComponentEditTodo
                saveTodo={saveTodo}
                editValue={editValue}
                todo={todo}
                handlerOnChangeEditTodo={handlerOnChangeEditTodo}
                cancelTodoEdit={cancelTodoEdit}
              />
            ) : (
              <ComponentTodo
                handlerEditTodo={handlerEditTodo}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleStatusTodo={toggleStatusTodo}
              />
            )}
            <hr />
          </div>
        );
      })}
    </div>
  );
}
