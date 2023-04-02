const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  assignedStudents: [],
  remainingStudents: [],
  totalStudents: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    getTotalStudents(state, action) {
      state.totalStudents = action.payload;
    },
    getAssignedStudents(state, action) {
      state.assignedStudents = action.payload;
    },
    getRemainingStudents(state, action) {
      state.remainingStudents = action.payload;
    },
  },
});

export const { getTotalStudents, getAssignedStudents, getRemainingStudents } =
  studentSlice.actions;
export default studentSlice.reducer;
