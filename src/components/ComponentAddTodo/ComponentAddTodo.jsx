import { useState } from 'react';
import style from './ComponentAddTodo.module.css';
import { allFetch } from '../../fetchApi/allFetch';
const REGEXP_VALIDATE_INPUT = /^(?! +$).{2,64}$/;

const { fetchAddTodo } = allFetch;

export function ComponentAddTodo({ setTodoList, getData, todoList }) {
  const [addTodoValue, setAddTodoValue] = useState('');

  //добавляю задачу
  async function addTodo(evt) {
    evt.preventDefault();
    if (!REGEXP_VALIDATE_INPUT.test(addTodoValue.trim())) {
      alert('Строка должна содержать от 2 до 64  символов ');
      return;
    }

    const objToSend = {
      title: addTodoValue,
    };

    try {
      const data = await fetchAddTodo(objToSend);

      setTodoList([...todoList, data]);
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
          title="ошибочка"
          name="todo"
          value={addTodoValue}
          onChange={(e) => {
            setAddTodoValue(e.target.value);
          }}
        />
        <button className="add-btn">add</button>
      </form>
    </div>
  );
}
