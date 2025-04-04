import { CONSTANTS } from '../constants/constants';
const { API_URL } = CONSTANTS;

async function featchGetTodos(statusTodos) {
  try {
    const response = await fetch(`${API_URL}?filter=${statusTodos}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Ошибка запроса данных', error);
  }
}

async function fetchAddTodo(objToSend) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(objToSend),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('ошибка добавления задачи', error);
  }
}

async function fetchDeleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log('ошибка удаления задачи', error);
  }
}

async function fetchSaveTodo(id, objToSend) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(objToSend),
    });
  } catch (error) {
    console.log('ошибка изменения записи', error);
  }
}

async function fetchToggleStatusTodo(id, objToSend) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(objToSend),
    });
  } catch (error) {
    console.log('ошибка изменения записи', error);
  }
}

export const allFetch = {
  featchGetTodos,
  fetchAddTodo,
  fetchDeleteTodo,
  fetchSaveTodo,
  fetchToggleStatusTodo,
};
