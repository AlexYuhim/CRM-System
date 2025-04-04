import { useEffect, useState } from 'react';

import { ComponentTodoList } from '../../components/ComponentTodoList/ComponentTodoList';
import { ComponentListOfTasks } from '../../components/ComponentListOfTasks/ComponentListOfTasks';
import { ComponentAddTodo } from '../../components/ComponentAddTodo/ComponentAddTodo';
import { allFetch } from '../../fetchApi/allFetch';
import style from './ComponentTodoBoard.module.css';

const { featchGetTodos } = allFetch;

export function ComponentTodoBoard() {
  const [todoList, setTodoList] = useState([]);
  const [statusTodos, setStatusTodos] = useState('all');
  const [countTodos, setCountTodos] = useState({});

  // отслеживаем изминение статуса списка задач
  useEffect(() => {
    getData();
  }, [statusTodos]);

  // получаю список задач в зависимости от статуса задачи
  async function getData() {
    try {
      const data = await featchGetTodos(statusTodos);
      setCountTodos(data.info);
      setTodoList(data.data);
    } catch (error) {
      console.log('Ошибка запроса данных', error);
    }
  }

  return (
    <div className={style.board_todo}>
      <h2>доска для размещения todo</h2>
      <ComponentListOfTasks
        statusTodos={statusTodos}
        countTodos={countTodos}
        setStatusTodos={setStatusTodos}
      />
      <div className={style.group_input_ouyput}>
        <ComponentAddTodo
          setTodoList={setTodoList}
          getData={getData}
          todoList={todoList}
        />
        <ComponentTodoList
          todoList={todoList}
          setTodoList={setTodoList}
          getData={getData}
        />
      </div>
    </div>
  );
}
