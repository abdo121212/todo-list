import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [
    { id: 1, title: "Make a cup of coffee or tea ☕🍵.", completed: true },
    { id: 2, title: "Respond to important email ✉️✉️.", completed: false },
  ],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push({
        title: action.payload,
        id:
          state.todoList.length > 0
            ? state.todoList[state.todoList.length - 1].id + 1
            : 1,
        completed: false,
      });
    },
    removeTodos: (state, action) => {
      state.todoList = state.todoList.filter(
        (ele) => ele.id !== action.payload
      );
    },
    completedTodo: (state, action) => {
      const foundById = state.todoList.find((ele) => ele.id === action.payload);
      foundById.completed = !foundById.completed;
    },
    completedAllTodos: (state) => {
      state.todoList = state.todoList.map((ele) => ({
        ...ele,
        completed: true,
      }));
    },
  },
});

export default todoSlice.reducer;

export const { addTodo, removeTodos, completedTodo, completedAllTodos } =
  todoSlice.actions;
