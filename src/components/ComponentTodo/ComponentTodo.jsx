import style from './ComponentTodo.module.css';
export function ComponentTodo({
  todo,
  deleteTodo,
  toggleStatusTodo,
  countTodos,
}) {
  const { title, id, isDone } = todo;

  return (
    <div className={style.todo_wr} key={id}>
      <input
        readOnly
        checked={isDone}
        type="checkbox"
        onClick={() => toggleStatusTodo(id, isDone)}
      />
      <div className={isDone ? style.completed_todo : ''}>{title}</div>
      <button>edit</button>
      <button onClick={() => deleteTodo(id)}>del</button>
    </div>
  );
}
