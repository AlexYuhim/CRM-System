import { useState } from 'react';
import CopmponentInputTodo from '../CopmponentInputTodo/CopmponentInputTodo';
import { ComponentTodoList } from '../ComponentItemsList/ComponentTodoList';

export function ComponentBoard() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const addTodo = () => {
    setTodoList([...todoList, todo]);
    setTodo('');
  };
  return (
    <>
      <h2>доска для размещения todo</h2>
      <CopmponentInputTodo todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <ComponentTodoList todoList={todoList} />
    </>
  );
}
