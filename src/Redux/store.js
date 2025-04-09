import { configureStore } from "@reduxjs/toolkit";
import todo from "./Feature/todoSlice.js";
export const store = configureStore({
  reducer: {
    todo,
  },
});
