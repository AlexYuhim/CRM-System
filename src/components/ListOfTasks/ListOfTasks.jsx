import style from './ListOfTasks.module.css';
export function ListOfTasks({ countTodos, setStatusTodos, statusTodos }) {
  return (
    <div className={style.wr_count_todo}>
      <button
        className={statusTodos === 'all' ? `${style.btn_active}` : undefined}
        onClick={() => setStatusTodos('all')}
      >
        All: ({countTodos.all})
      </button>
      <button
        className={
          statusTodos === 'completed' ? `${style.btn_active}` : undefined
        }
        onClick={() => setStatusTodos('completed')}
      >
        completed: ({countTodos.completed})
      </button>
      <button
        className={statusTodos === 'inWork' ? `${style.btn_active}` : undefined}
        onClick={() => setStatusTodos('inWork')}
      >
        inWork: ({countTodos.inWork})
      </button>
    </div>
  );
}
