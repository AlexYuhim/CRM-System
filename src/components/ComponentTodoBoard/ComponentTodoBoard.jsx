import { useEffect, useState } from 'react';
import CopmponentInputTodo from '../CopmponentInputTodo/CopmponentInputTodo';
import { ComponentTodoList } from '../ComponentTodoList/ComponentTodoList';
import { ComponentListOfTasks } from '../ComponentListOfTasks/ComponentListOfTasks';

export function ComponentTodoBoard() {
  const TODO_API = 'https://easydev.club/api/v1';
  const [todoList, setTodoList] = useState([]);
  const [statusTodos, setStatusTodos] = useState('all');
  const [countTodos, setCounTodos] = useState({});
  const [addTodoValue, setAddTodoValue] = useState('');

  // отслеживаем изминение статуса списка задач
  useEffect(() => {
    featchGetTodos();
  }, [statusTodos]);

  // получаю список задач в зависимости от статуса задачи
  async function featchGetTodos() {
    try {
      const response = await fetch(`${TODO_API}/todos?filter=${statusTodos}`);
      const data = await response.json();
      setCounTodos(data.info);
      setTodoList(data.data);
      console.log('data', data);
    } catch (error) {
      console.log('Ошибка запроса данных', error);
    }
  }
  console.log('countTodos', countTodos);
  console.log('todoList', todoList);

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
          countTodos={countTodos}
          toggleStatusTodo={toggleStatusTodo}
          todoList={todoList}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}
