import { configureStore } from "@reduxjs/toolkit";
import mentorReducer from "./mentorSlice";
import studentReducer from "./studentSlice";

//creating a redux store
const store = configureStore({
  reducer: {
    mentors: mentorReducer,
    students: studentReducer,
  },
});

export default store;
