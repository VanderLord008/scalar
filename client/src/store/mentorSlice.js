const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentMentor: null,
  allMentors: [],
};

const mentorSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {
    addMentors(state, action) {
      state.allMentors = action.payload;
    },
    setMentor(state, action) {
      state.currentMentor = action.payload;
    },
  },
});

export const { addMentors, setMentor } = mentorSlice.actions;
export default mentorSlice.reducer;
