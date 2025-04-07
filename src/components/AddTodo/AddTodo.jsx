import { useState } from 'react';
import style from './AddTodo.module.css';
import { REGEXP_VALIDATE_TODO_TITLE } from '@/constants/constants';
import { fetchAddTodo } from '@/api/allFetch';

export function AddTodo({ getData }) {
  const [addTodoValue, setAddTodoValue] = useState('');

  //добавляю задачу
  async function addTodo(event) {
    event.preventDefault();
    if (!REGEXP_VALIDATE_TODO_TITLE.test(addTodoValue.trim())) {
      alert('Строка должна содержать от 2 до 64  символов ');
      return;
    }

    const objToSend = {
      title: addTodoValue,
    };

    try {
      await fetchAddTodo(objToSend);
      setAddTodoValue('');
      getData();
    } catch (error) {
      console.log('ошибка добавления задачи', error);
    }
  }

  return (
    <div className={style.input_field_wr}>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="add todo"
          title="введите задачу"
          name="todo"
          value={addTodoValue}
          onChange={(event) => {
            setAddTodoValue(event.target.value);
          }}
        />
        <button className="add-btn">add</button>
      </form>
    </div>
  );
}
