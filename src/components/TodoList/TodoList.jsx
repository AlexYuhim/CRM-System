import { Todo } from '@/components/Todo/Todo';

export function TodoList({ todoList, setTodoList, getData }) {
  return (
    <div>
      {todoList.map((todo) => {
        return (
          <div key={todo.id}>
            <Todo todo={todo} setTodoList={setTodoList} getData={getData} />
            <hr />
          </div>
        );
      })}
    </div>
  );
}
