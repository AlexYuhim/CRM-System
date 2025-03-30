const CopmponentInputTodo = ({ value, setAddTodoValue, fetchAddTodo }) => {
  return (
    <div className="input-wr">
      <input
        type="text"
        placeholder="add todo"
        name="todo"
        value={value}
        onChange={(e) => {
          setAddTodoValue(e.target.value);
        }}
      />
      <button className="add-btn" onClick={fetchAddTodo}>
        add
      </button>
    </div>
  );
};

export default CopmponentInputTodo;
