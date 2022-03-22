import React, {useEffect, useState} from 'react';
import { Provider, useSelector, useDispatch } from "react-redux";

import {
  store,
  selectTodos,
  fetchTodos,
  toggleTodo,
  removeTodo,
  addTodo, clearTodo, selectFilter, toggleOnlyActive,
} from "./redux/store";

function TodoApp() {
  const [newTodoText, setNewTodoText] = useState<string>('')

  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const onlyActive = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleAddNewTodo = () => {
    dispatch(addTodo(newTodoText))
    setNewTodoText('');
  }

  return (
    <div className="h-screen w-full p-8 sm:p-16 bg-gray-800 text-white">
      <main className="m-auto max-w-lg w-full overflow-hidden">
        <h1
          className="uppercase text-2xl block font-bold py-6 text-gray-400 tracking-widest text-center"
        >
          Заметки
        </h1>
        <div
          className="flex items-center justify-between relative"
        >
          <input placeholder="Добавить новую запись..." type="text" value={newTodoText} onChange={e => setNewTodoText(e.target.value)}
                 className="p-4 pr-20 border-t-2 border-green-500 rounded bg-gray-900 text-white w-full shadow-inner outline-none"/>
          <button
            id="js-add-item"
            className="text-green-400 hover:text-green-300 bg-gray-900 font-semibold py-2 px-4 absolute right-0 mr-2 focus:outline-none"
            onClick={handleAddNewTodo}
          >
            +
          </button>
        </div>
        <ul id="js-list" className="m-0 my-4 p-0 list-none w-full overflow-auto" style={{ height: '500px' }}>
          {!todos.length && (<span
            className="text-center inline-block w-full p-4 text-gray-600 text-"
          >
            Добавьте новые записи!
          </span>)}
          {todos.map(todo => (
            <li
              className="w-full flex justify-between m-0 p-4 flex cursor-pointer mb-1"
              key={todo.id}
              // onClick={() => dispatch(toggleTodo(todo))}
            >
              <div>
                <input
                  type="checkbox"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm text-white bg-white checked:bg-green-500 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  checked={todo.done}
                  id={`flexCheckDefault${todo.id}`}
                  onChange={() => dispatch(toggleTodo(todo))}
                />
                <label className={`form-check-label inline-block ${todo.done ? 'text-gray-500' : 'text-white'}`} htmlFor={`flexCheckDefault${todo.id}`}>
                  {todo.text}
                </label>
              </div>
              <button className="w-24 text-red-600 border border-red-600 rounded-md font-semibold flex-none focus:outline-none" onClick={() => dispatch(removeTodo(todo))}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
        <div className="flex py-4 border-t border-gray-900 justify-between">
          <div>
            <button
              id="js-filter-all"
              className={`text-xs mr-3 hover:underline ${onlyActive ? 'text-gray-500' : 'text-green-500 font-bold'} focus:outline-none`}
              onClick={() => dispatch(toggleOnlyActive())}
            >
              Все
            </button>
            <button
              id="js-filter-active"
              className={`text-xs mr-3 hover:underline ${!onlyActive ? 'text-gray-500' : 'text-green-500 font-bold'} focus:outline-none`}
              onClick={() => dispatch(toggleOnlyActive())}
            >
              Активные
            </button>
          </div>
          <div>
            <button id="js-filter-clear"
                    className="text-xs mr-3 text-red-500 focus:outline-none hover:underline"
                    onClick={() => dispatch(clearTodo())}
            >
              Очистить
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;
