import { useEffect, useState } from 'react';

import style from './TodoBoardPages.module.css';
import { featchGetTodos } from '@/api/allFetch';
import { AddTodo } from '@/components/AddTodo/AddTodo';
import { ListOfTasks } from '@/components/ListOfTasks/ListOfTasks';
import { TodoList } from '@/components/TodoList/TodoList';

export function TodoBoardPages() {
  const [todoList, setTodoList] = useState([]);
  const [statusTodos, setStatusTodos] = useState('all');
  const [countTodos, setCountTodos] = useState({
    all: 0,
    comleted: 0,
    inWork: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // отслеживаем изминение статуса списка задач
  useEffect(() => {
    getData();
  }, [statusTodos]);

  // получаю список задач в зависимости от статуса задачи
  async function getData() {
    try {
      setIsLoading(true);
      const data = await featchGetTodos(statusTodos);
      setCountTodos(data.info);
      setTodoList(data.data);
    } catch (error) {
      console.log('Ошибка запроса данных', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={style.board_todo}>
      <h2>доска для размещения todo</h2>
      <ListOfTasks
        statusTodos={statusTodos}
        countTodos={countTodos}
        setStatusTodos={setStatusTodos}
      />
      <div className={style.group_input_ouyput}>
        <AddTodo getData={getData} setIsLoading={setIsLoading} />
        {isLoading ? (
          'Loading...'
        ) : (
          <TodoList
            todoList={todoList}
            setTodoList={setTodoList}
            getData={getData}
          />
        )}
      </div>
    </div>
  );
}
