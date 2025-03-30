import style from './ComponentEditTodo.module.css';
export function ComponentEditTodo({
  todo,
  cancelTodoEdit,
  handlerOnChangeEditTodo,
  editValue,
}) {
  const { title, id, isDone } = todo;
  return (
    <div className={style.todo_edit_wr} key={id}>
      <input type="checkbox" disabled />
      <input
        value={editValue}
        type="text"
        onChange={(e) => handlerOnChangeEditTodo(e.target.value)}
      />
      <button onClick={() => {}}>save</button>
      <button onClick={() => cancelTodoEdit()}>cancel</button>
    </div>
  );
}
