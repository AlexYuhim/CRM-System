export function ComponentListOfTasks({ countTodos, setStatusTodos }) {
  const { all, completed, inWork } = countTodos;

  return (
    <div>
      <button onClick={() => setStatusTodos('all')}>All: ({all})</button>
      <button onClick={() => setStatusTodos('completed')}>
        completed: ({completed})
      </button>
      <button onClick={() => setStatusTodos('inWork')}>
        inWork: ({inWork})
      </button>
    </div>
  );
}
