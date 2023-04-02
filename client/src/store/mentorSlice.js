const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentMentor: null,
  allMentors: [],
};

//creating a slice for our redux store that will store all the mentors as well as our current selected mentor
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
