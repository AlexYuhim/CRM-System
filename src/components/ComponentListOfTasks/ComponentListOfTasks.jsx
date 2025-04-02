import style from './ComponentListOfTasks.module.css';
export function ComponentListOfTasks({
  countTodos,
  setStatusTodos,
  statusTodos,
}) {
  const { all, completed, inWork } = countTodos;

  return (
    <div className={style.wr_count_todo}>
      <button
        className={statusTodos === 'all' ? `${style.btn_active}` : undefined}
        onClick={() => setStatusTodos('all')}
      >
        All: ({all})
      </button>
      <button
        className={
          statusTodos === 'completed' ? `${style.btn_active}` : undefined
        }
        onClick={() => setStatusTodos('completed')}
      >
        completed: ({completed})
      </button>
      <button
        className={statusTodos === 'inWork' ? `${style.btn_active}` : undefined}
        onClick={() => setStatusTodos('inWork')}
      >
        inWork: ({inWork})
      </button>
    </div>
  );
}
