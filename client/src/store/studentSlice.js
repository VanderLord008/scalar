const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  assignedStudents: [],
  remainingStudents: [],
  totalStudents: [],
};

//creating a student Slice for the redux store that will store total students, assigned students and unassigned students
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
