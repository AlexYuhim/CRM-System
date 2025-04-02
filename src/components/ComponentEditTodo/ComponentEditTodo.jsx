import style from './ComponentEditTodo.module.css';
export function ComponentEditTodo({
  todo,
  cancelTodoEdit,
  handlerOnChangeEditTodo,
  editValue,
  saveTodo,
}) {
  const { id, isDone } = todo;

  return (
    <div className={style.todo_edit_wr} key={id}>
      <input type="checkbox" disabled checked={isDone} />
      <input
        autoFocus
        value={editValue}
        type="text"
        onChange={(e) => handlerOnChangeEditTodo(e.target.value)}
        />
      <button onClick={() => saveTodo(id)}>save</button>
      <button onClick={() => cancelTodoEdit()}>cancel</button>
    </div>
    
  );
}
