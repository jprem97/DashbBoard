import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksSlice";
import statusReducer from "../features/statusSlice";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    members: statusReducer
  }
});
