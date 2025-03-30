import style from './ComponentTodo.module.css';
export function ComponentTodo({
  todo,
  deleteTodo,
  toggleStatusTodo,
  handlerEditTodo,
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
      <div className={isDone ? style.completed_todo : undefined}>{title}</div>
      <button onClick={() => handlerEditTodo(id, title)}>edit</button>
      <button onClick={() => deleteTodo(id)}>del</button>
    </div>
  );
}
