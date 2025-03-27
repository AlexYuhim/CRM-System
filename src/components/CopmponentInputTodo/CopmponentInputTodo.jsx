const CopmponentInputTodo = ({ todo, setTodo, addTodo }) => {
  return (
    <div className="input-wr">
      <input
        type="text"
        placeholder="add todo"
        name="todo"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button className="add-btn" onClick={addTodo}>
        add
      </button>
    </div>
  );
};

export default CopmponentInputTodo;
