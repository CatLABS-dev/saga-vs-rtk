import {AnyAction} from "redux";
import {put, takeEvery, select} from "redux-saga/effects";

import {createTodo, deleteTodo, getTodos, Todo, updateTodo, clearTodo} from "./api";
import * as actions from "./actions";
import {selectFilter} from "./store";

function* getTodosAction() {
  const onlyAction: boolean = yield select(selectFilter);

  const todos: Todo[] = yield getTodos(onlyAction);
  yield put({ type: actions.TODOS_FETCH_SUCCEEDED, payload: todos });
}

function* createTodoAction(action: AnyAction) {
  yield createTodo(action.payload);
  yield put({ type: actions.TODOS_FETCH_REQUESTED });
}

function* updateTodoAction(action: AnyAction) {
  yield updateTodo(action.payload);
  yield put({ type: actions.TODOS_FETCH_REQUESTED });
}

function* deleteTodoAction(action: AnyAction) {
  yield deleteTodo(action.payload);
  yield put({ type: actions.TODOS_FETCH_REQUESTED });
}

function* clearTodoAction() {
  yield clearTodo();
  yield put({ type: actions.TODOS_FETCH_REQUESTED });
}

export function* rootSaga() {
  yield takeEvery(actions.TODOS_FETCH_REQUESTED, getTodosAction);
  yield takeEvery(actions.UPDATE_TODO_REQUESTED, updateTodoAction);
  yield takeEvery(actions.DELETE_TODO_REQUESTED, deleteTodoAction);
  yield takeEvery(actions.CREATE_TODO_REQUESTED, createTodoAction);
  yield takeEvery(actions.CLEAR_TODOS_REQUESTED, clearTodoAction);
  yield takeEvery(actions.TOGGLE_ONLY_ACTIVE, getTodosAction);
}
