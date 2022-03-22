import {createStore, applyMiddleware, AnyAction} from "redux";
import logger from 'redux-logger'
import createSagaMiddleware from "@redux-saga/core";
import * as actions from './actions';

import { Todo } from "./api";
import { rootSaga } from "./saga";

interface RootState { todos: Todo[], onlyActive: boolean }

const initialState: RootState = {
  todos: [],
  onlyActive: false,
}

const todoReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.TODOS_FETCH_SUCCEEDED:
      return {
        ...state,
        todos: action.payload,
      };
    case actions.TOGGLE_ONLY_ACTIVE:
      return {
        ...state,
        onlyActive: !state.onlyActive,
      };
    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(todoReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export const selectTodos = (state: RootState) => state.todos;
export const selectFilter = (state: RootState) => state.onlyActive;

export const fetchTodos = () => ({ type: actions.TODOS_FETCH_REQUESTED });
export const toggleTodo = (todo: Todo) => ({
  type: actions.UPDATE_TODO_REQUESTED,
  payload: {
    ...todo,
    done: !todo.done,
  },
});
export const removeTodo = (todo: Todo) => ({
  type: actions.DELETE_TODO_REQUESTED,
  payload: todo,
});
export const addTodo = (text: string) => ({
  type: actions.CREATE_TODO_REQUESTED,
  payload: text,
});
export const clearTodo = () => ({
  type: actions.CLEAR_TODOS_REQUESTED,
});
export const toggleOnlyActive = () => ({
  type: actions.TOGGLE_ONLY_ACTIVE,
});
