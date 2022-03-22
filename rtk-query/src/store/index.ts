import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAll: builder.query<Todo[], boolean>({
      query: (onlyActive = false) => ({
        url: `todos?active=${onlyActive}`,
        method: "GET"
      }),
      providesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: "PUT",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    deleteTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: "DELETE",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    addTodo: builder.mutation<string, string>({
      query(text) {
        return {
          url: `todos`,
          method: "POST",
          body: {
            text,
          },
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    clearTodos: builder.mutation<Todo[], void>({
      query() {
        return {
          url: `todos/clear`,
          method: "GET"
        }
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    })
  }),
});
