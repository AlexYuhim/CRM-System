export function ComponentInputTodo({ value, setAddTodoValue, fetchAddTodo }) {
  return (
    <div className="input-wr">
      <form onSubmit={fetchAddTodo}>
        <input
          type="text"
          placeholder="add todo"
          title="ошибочка"
          name="todo"
          value={value}
          onChange={(e) => {
            setAddTodoValue(e.target.value);
          }}
        />
        <button className="add-btn">add</button>
      </form>
    </div>
  );
}
