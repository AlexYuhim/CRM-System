import { Todo } from '@/components/Todo/Todo';
import { useState } from 'react';

export function TodoList({ todoList, setTodoList, getData }) {
  const [idEditTodo, setidEditTodo] = useState(null);

  return (
    <div>
      {todoList.map((todo) => {
        return (
          <div key={todo.id}>
            <Todo
              todo={todo}
              setTodoList={setTodoList}
              getData={getData}
              idEditTodo={idEditTodo}
              setidEditTodo={setidEditTodo}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
}
