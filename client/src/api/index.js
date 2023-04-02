import axios from "axios";

const mentorURL = "http://localhost:5000/mentors";
const studentURL = "http://localhost:5000/students";

export const fetchMentors = () => axios.get(mentorURL);
export const createMentor = (data) => axios.post(mentorURL, data);
export const assignMentor = (data) => axios.post(mentorURL + "/assign", data);
export const submitMentor = (data) => axios.post(mentorURL + "/submit", data);
export const removeMentor = (data) => axios.post(mentorURL + "/remove", data);

export const fetchStudents = () => axios.get(studentURL);
export const createStudent = (data) => axios.post(studentURL, data);
export const updateStudent = (data) => axios.post(studentURL + "/update", data);
