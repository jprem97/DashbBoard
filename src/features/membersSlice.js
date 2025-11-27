import { createSlice } from "@reduxjs/toolkit";

const initialMembers = [
  { id: 1, status: "working", task: "some work" },
  { id: 2, status: "working", task: "some work" },
  { id: 3, status: "break", task: "some work" },
  { id: 4, status: "break", task: "some work" },
  { id: 5, status: "working", task: "some work" }
];

const slice = createSlice({
  name: "members",
  initialState: initialMembers,
  reducers: {
    setMemberStatus(state, action) {
      const { id, status } = action.payload;
      const m = state.find(x => x.id === id);
      if (m) m.status = status;
    },
    updateMemberTask(state, action) {
      const { id, task } = action.payload;
      const m = state.find(x => x.id === id);
      if (m) m.task = task;
    },
    resetMembers() {
      return initialMembers;
    }
  }
});

export const { setMemberStatus, updateMemberTask, resetMembers } = slice.actions;
export default slice.reducer;
