export function ComponentTodoList({ todoList }) {
  return (
    <div>
      {todoList.map((todo, i) => {
        return <div key={i}> {todo}</div>;
      })}
    </div>
  );
}
