import { useEffect, useState } from 'react';

import { ComponentTodoList } from '../ComponentTodoList/ComponentTodoList';
import { ComponentListOfTasks } from '../ComponentListOfTasks/ComponentListOfTasks';
import { ComponentInputTodo } from '../ComponentInputTodo/ComponentInputTodo';

export function ComponentTodoBoard() {
  const TODO_API = 'https://easydev.club/api/v1';
  const [todoList, setTodoList] = useState([]);
  const [statusTodos, setStatusTodos] = useState('all');
  const [countTodos, setCountTodos] = useState({});
  const [addTodoValue, setAddTodoValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [idForEditValue, setIdForEditValue] = useState('');
  const REGEXP_VALIDATE_INPUT = /^(?! +$).{2,64}$/;
  // отслеживаем изминение статуса списка задач
  useEffect(() => {
    featchGetTodos();
  }, [statusTodos]);

  // получаю список задач в зависимости от статуса задачи
  async function featchGetTodos() {
    try {
      const response = await fetch(`${TODO_API}/todos?filter=${statusTodos}`);
      const data = await response.json();
      setCountTodos(data.info);
      setTodoList(data.data);
    } catch (error) {
      console.log('Ошибка запроса данных', error);
    }
  }

  //добавляю задачу
  async function fetchAddTodo(evt) {
    evt.preventDefault();
    if (!REGEXP_VALIDATE_INPUT.test(addTodoValue.trim())) {
      alert('Строка должна содержать от 2 до 64  символов ');
      return;
    }

    const objToSend = {
      title: addTodoValue,
    };

    try {
      const response = await fetch(`${TODO_API}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(objToSend),
      });

      const data = await response.json();

      setTodoList([...todoList, data]);
      setAddTodoValue('');
      featchGetTodos();
      console.log('addTodoValue', addTodoValue);
    } catch (error) {
      console.log('ошибка добавления задачи', error);
    }
  }

  //удаляю задачу

  async function deleteTodo(id) {
    try {
      await fetch(`${TODO_API}/todos/${id}`, {
        method: 'DELETE',
      });

      featchGetTodos();
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
      await fetch(`${TODO_API}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(objToSend),
      });
      featchGetTodos();
    } catch (error) {
      console.log('ошибка изменения записи', error);
    }
  }

  // добавдяю флаг в объект для редактирования задачи
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
    featchGetTodos();
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
      await fetch(`${TODO_API}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(objToSend),
      });
      featchGetTodos();
    } catch (error) {
      console.log('ошибка изменения записи', error);
    }
    featchGetTodos();
  }

  return (
    <>
      <h2>доска для размещения todo</h2>
      <div>
        <ComponentInputTodo
          value={addTodoValue}
          setAddTodoValue={setAddTodoValue}
          fetchAddTodo={fetchAddTodo}
        />
        <ComponentListOfTasks
          countTodos={countTodos}
          setStatusTodos={setStatusTodos}
        />
        <ComponentTodoList
          idForEditValue={idForEditValue}
          saveTodo={saveTodo}
          editValue={editValue}
          handlerOnChangeEditTodo={handlerOnChangeEditTodo}
          cancelTodoEdit={cancelTodoEdit}
          handlerEditTodo={handlerEditTodo}
          toggleStatusTodo={toggleStatusTodo}
          todoList={todoList}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}
