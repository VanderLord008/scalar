import React, { useEffect, useState } from "react";
import { assignMentor, removeMentor } from "../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateStudent } from "../api";
import styles from "./studentCard.module.css";

const StudentCard = ({ data }) => {
  const navigate = useNavigate();
  let assigned = data.assigned;
  const selectedMentor = useSelector((state) => state.mentors.currentMentor);
  let studentID = data.studentID;
  let mentorID = selectedMentor.mentorID;

  //assigning the selected student to this mentor
  const assignHandler = async ({ data }) => {
    try {
      console.log("data is");
      console.log(data);
      console.log(mentorID);
      await assignMentor({ mentorID, studentID });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };
  //removing a selected student from the selected mentors list
  const removeHandler = async ({ data }) => {
    try {
      let studentID = data.studentID;
      await removeMentor({ mentorID, studentID });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  //updating the marks of the student
  const handleUpdation = async (e) => {
    e.preventDefault();
    let newStudent = { ...data };
    //updating this students marks with new marks
    newStudent.chemistryMarks = chemistryMarks;
    newStudent.mathsMarks = mathsMarks;
    newStudent.physicsMarks = physicsMarks;
    if (assigned) {
      await updateStudent(newStudent);
      navigate("/");
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

  useEffect(() => {
    for (let it = 0; it < assignedStudents.length; it++) {
      if (data.studentID === assignedStudents[it]) {
        setIsMentor(true);
      }
    }
    if (assignedStudents.length < 4) {
      setCanAssign(true);
    }
  }, [assignedStudents, data.studentID]);

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
