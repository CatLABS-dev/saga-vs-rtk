const BASE_URL = "http://localhost:4000/todos";

export interface Todo {
  id: number;
  text: string;
  active: boolean;
  done: boolean;
}

export const getTodos = async (onlyActive: boolean): Promise<Todo[]> =>
  fetch(`${BASE_URL}?active=${onlyActive}`)
    .then((res) => res.json());

export const createTodo = async (text: string): Promise<Todo> =>
  fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  }).then((res) => res.json());

export const updateTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());

export const deleteTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/${todo.id}`, {
    method: "DELETE",
  }).then(() => todo);

export const clearTodo = async (): Promise<void> =>
  fetch(`${BASE_URL}/clear`, { method: 'GET' })
    .then(() => {});