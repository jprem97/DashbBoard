import { createSlice } from "@reduxjs/toolkit";

const initialTasks = [
  { id: 1, userId: 1, title: "Task A", dueDate: "2025-01-01", progress: 20, completed: false },
  { id: 2, userId: 2, title: "Task B", dueDate: "2025-01-02", progress: 50, completed: false },
  { id: 3, userId: 3, title: "Task C", dueDate: "2025-01-05", progress: 0, completed: false }
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasks,
  reducers: {
    updateTaskProgress(state, action) {
      const { id, delta } = action.payload;
      const t = state.find(x => x.id === id);
      if (t) {
        t.progress = Math.min(100, Math.max(0, t.progress + delta));
        t.completed = t.progress === 100;
      }
    },
    resetTasks(state, action) {
      return initialTasks;
    },
    setTasks(state, action) {
      return action.payload;
    },
    addTask(state, action) {
      state.push(action.payload);
    }
  }
});

export const { updateTaskProgress, resetTasks, setTasks, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
