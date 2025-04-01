import { ComponentEditTodo } from '../ComponentEditTodo/ComponentEditTodo';
import { ComponentTodo } from '../ComponentTodo/ComponentTodo';

export function ComponentTodoList({
  todoList,
  deleteTodo,
  toggleStatusTodo,
  handlerEditTodo,
  cancelTodoEdit,
  handlerOnChangeEditTodo,
  editValue,
  saveTodo,
  idForEditValue,
}) {
  return (
    <div>
      {todoList.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.isEdit && todo.id === idForEditValue ? (
              <ComponentEditTodo
                saveTodo={saveTodo}
                editValue={editValue}
                todo={todo}
                handlerOnChangeEditTodo={handlerOnChangeEditTodo}
                cancelTodoEdit={cancelTodoEdit}
              />
            ) : (
              <ComponentTodo
                handlerEditTodo={handlerEditTodo}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleStatusTodo={toggleStatusTodo}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
