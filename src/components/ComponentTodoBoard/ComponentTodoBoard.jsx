import { useEffect, useState } from 'react';
import CopmponentInputTodo from '../CopmponentInputTodo/CopmponentInputTodo';
import { ComponentTodoList } from '../ComponentTodoList/ComponentTodoList';
import { ComponentListOfTasks } from '../ComponentListOfTasks/ComponentListOfTasks';

export function ComponentTodoBoard() {
  const TODO_API = 'https://easydev.club/api/v1';
  const [todoList, setTodoList] = useState([]);
  const [statusTodos, setStatusTodos] = useState('all');
  const [countTodos, setCountTodos] = useState({});
  const [addTodoValue, setAddTodoValue] = useState('');
  const [editValue, setEditValue] = useState('');

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
  // console.log('countTodos', countTodos);
  // console.log('todoList', todoList);

  //добавляю задачу
  async function fetchAddTodo() {
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
      featchGetTodos();
      setAddTodoValue('');
    } catch (error) {
      console.log('ошибка добавления записи', error);
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
      console.log('ошибка удаления записи', error);
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
      console.log('ошибка добавления записи', error);
    }
  }

  // добавдяю флаг в объект для редактирования
  const handlerEditTodo = (id, title) => {
    console.log('title', title);

    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isEdit: true } : todo
      )
    );
    setEditValue(title);
  };
  // console.log('todoListUp', todoList);

  function handlerOnChangeEditTodo(e) {
    console.log('e', e);
    setEditValue(e);
  }

  function cancelTodoEdit() {
    featchGetTodos();
  }
  return (
    <>
      <h2>доска для размещения todo</h2>
      <div>
        <CopmponentInputTodo
          value={addTodoValue}
          setAddTodoValue={setAddTodoValue}
          fetchAddTodo={fetchAddTodo}
        />
        <ComponentListOfTasks
          countTodos={countTodos}
          setStatusTodos={setStatusTodos}
        />
        <ComponentTodoList
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
