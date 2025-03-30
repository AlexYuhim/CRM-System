import { ComponentTodo } from '../ComponentTodo/ComponentTodo';

export function ComponentTodoList({
  todoList,
  deleteTodo,
  toggleStatusTodo,
  countTodos,
}) {
  return (
    <div>
      {todoList.map((todo) => {
        return (
          <div key={todo.id}>
            <ComponentTodo
              countTodos={countTodos}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleStatusTodo={toggleStatusTodo}
            />
          </div>
        );
      })}
    </div>
  );
}
