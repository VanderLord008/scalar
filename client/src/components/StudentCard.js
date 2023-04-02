import React, { useEffect, useState } from "react";
import styles from "./studentCard.module.css";
import { addMentors, setMentor } from "../store/mentorSlice";
import { getTotalStudents } from "../store/studentSlice";

import { assignMentor, removeMentor } from "../api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchMentors, fetchStudents } from "../api";

import { useNavigate } from "react-router-dom";
import {
  getAssignedStudents,
  getRemainingStudents,
} from "../store/studentSlice";
import { updateStudent } from "../api";

const StudentCard = ({ data }) => {
  const navigate = useNavigate();
  let assigned = data.assigned;
  const dispatch = useDispatch();
  const selectedMentor = useSelector((state) => state.mentors.currentMentor);
  let studentID = data.studentID;
  let mentorID = selectedMentor.mentorID;

  const cleanup = () => {
    function cleanupMentorData() {
      dispatch(setMentor(null));
      dispatch(addMentors([]));
    }
    function cleanupStudentsData() {
      dispatch(getTotalStudents([]));
      dispatch(getRemainingStudents([]));
      dispatch(getAssignedStudents([]));
    }
    cleanupMentorData();
    cleanupStudentsData();
  };

  const assignHandler = async ({ data }) => {
    try {
      console.log("data is");
      console.log(data);
      console.log(mentorID);
      await assignMentor({ mentorID, studentID });
    } catch (error) {
      console.log(error);
    }
    cleanup();
    navigate("/");
  };
  const removeHandler = async ({ data }) => {
    try {
      console.log(data);
      console.log("i am clicked");
      console.log("men is");
      console.log(mentorID);
      let studentID = data.studentID;
      await removeMentor({ mentorID, studentID });
    } catch (error) {
      console.log(error);
    }
    cleanup();
    navigate("/");
  };

  const handleUpdation = async (e) => {
    e.preventDefault();
    let newStudent = { ...data };
    newStudent.chemistryMarks = chemistryMarks;
    newStudent.mathsMarks = mathsMarks;
    newStudent.physicsMarks = physicsMarks;
    if (assigned) {
      await updateStudent(newStudent);
      navigate("/");
    } else {
      console.log("not assigned");
    }
  };

  const [chemistryMarks, setChemistryMarks] = useState(data.chemistryMarks);
  const [physicsMarks, setphysicsMarks] = useState(data.physicsMarks);
  const [mathsMarks, setmathsMarks] = useState(data.mathsMarks);
  const [isMentor, setIsMentor] = useState(false);
  const [canAssign, setCanAssign] = useState(false);

  let assignedStudents = useSelector(
    (state) => state.mentors.currentMentor.assignedStudents
  );
  //  const allStudents = useSelector((state) => state.students.totalStudents);

  console.log("assigned");
  console.log(assignedStudents);

  useEffect(() => {
    for (let it = 0; it < assignedStudents.length; it++) {
      console.log("ran");
      if (data.studentID === assignedStudents[it]) {
        setIsMentor(true);
      }
    }
    if (assignedStudents.length < 4) {
      setCanAssign(true);
    }
  }, []);

  return (
    <div className={`${styles.card} ${styles.reactCard}`}>
      <div className={styles.textArea}>
        <h2>{data.name}</h2>
        <form
          action=""
          method="post"
          autoComplete="off"
          noValidate
          onSubmit={handleUpdation}
        >
          <div className={styles.chemistryMarks}>
            <p> chemistry marks</p>
            <input
              type="number"
              name="chemistryMarks"
              value={chemistryMarks}
              onChange={(e) => setChemistryMarks(e.target.value)}
            />
          </div>
          <div className={styles.mathsMarks}>
            <p>maths marks</p>
            <input
              type="number"
              name="mathsMarks"
              value={mathsMarks}
              onChange={(e) => setmathsMarks(e.target.value)}
            />{" "}
          </div>
          <div className={styles.physicsMarks}>
            <p>physics marks</p>
            <input
              type="number"
              name="physicsMarks"
              value={physicsMarks}
              onChange={(e) => setphysicsMarks(e.target.value)}
            />{" "}
          </div>
          {assigned && isMentor && (
            <button type="submit" onClick={handleUpdation}>
              update
            </button>
          )}
        </form>
        {!assigned && canAssign && (
          <button onClick={() => assignHandler({ data })}>Assign</button>
        )}
      </div>
      <div>
        {assigned && isMentor && (
          <button onClick={() => removeHandler({ data })}>Remove</button>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
