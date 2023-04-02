import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentCard from "../components/StudentCard";
import {
  getAssignedStudents,
  getRemainingStudents,
} from "../store/studentSlice";
import { submitMentor } from "../api";
import { useNavigate } from "react-router-dom";
import styles from "./details.module.css";

const Details = () => {
  const navigate = useNavigate();

  const selectedMentor = useSelector((state) => state.mentors.currentMentor);
  console.log(selectedMentor);
  const allStudents = useSelector((state) => state.students.totalStudents);
  const [showAssigned, setShowAssigned] = useState(false);
  const [showUnassigned, setShowUnassigned] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const assignedStudents = useSelector(
    (state) => state.students.assignedStudents
  );
  const remainingStudents = useSelector(
    (state) => state.students.remainingStudents
  );
  console.log("assigned students are");
  console.log(assignedStudents);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (assignedStudents.length >= 3 && assignedStudents.length < 5) {
      setCanSubmit(true);
    }
  }, []);

  const submitHandler = async () => {
    console.log("click successfully");
    let mentorID = selectedMentor.mentorID;
    console.log(mentorID);
    await submitMentor({ mentorID });
    navigate("/");
  };
  const assignedFilterHandler = () => {
    setShowAssigned(true);
    setIsFiltered(true);
  };
  const unassignedFilterHandler = () => {
    setIsFiltered(true);
    setShowAssigned(false);
    setShowUnassigned(true);
  };

  const totalFilterHandler = () => {
    setIsFiltered(false);
    setShowAssigned(false);
    setShowUnassigned(false);
  };
  return (
    <>
      {selectedMentor ? (
        <div className={styles.container}>
          <h1 className={styles.suggestion}>
            selected mentor is {selectedMentor.name}
          </h1>
          <h2 className={styles.suggestion}>Assigned students</h2>
          <div className={styles.studentContainer}>
            {assignedStudents.map((student) => (
              <StudentCard key={student.studentID} data={student} />
            ))}
          </div>
          <hr />
          <hr />
          <p className={styles.suggestion}>submit your students </p>
          {canSubmit ? (
            <button onClick={() => submitHandler()}>submit</button>
          ) : (
            <h2 className={styles.warning}>
              you dont meet the criteria to submit
            </h2>
          )}
          <hr />
          <hr />
          <div className={styles.filterButtons}>
            <button onClick={() => assignedFilterHandler()}>assigned</button>

            <button onClick={() => unassignedFilterHandler()}>
              unassigned
            </button>

            <button onClick={() => totalFilterHandler()}>total</button>
          </div>
          <h2 className={styles.suggestion}>Remaing students</h2>
          {!isFiltered && (
            <div className={styles.studentContainer}>
              {remainingStudents.map((student) => (
                <StudentCard key={student.studentID} data={student} />
              ))}
            </div>
          )}
          {isFiltered && showAssigned && (
            <div className={styles.studentContainer}>
              {remainingStudents.map(
                (student) =>
                  student.assigned && (
                    <StudentCard key={student.studentID} data={student} />
                  )
              )}
            </div>
          )}
          {isFiltered && showUnassigned && (
            <div className={styles.studentContainer}>
              {allStudents.map(
                (student) =>
                  !student.assigned && (
                    <StudentCard key={student.studentID} data={student} />
                  )
              )}
            </div>
          )}
          )
        </div>
      ) : (
        <h1>please select a mentor first</h1>
      )}
    </>
  );
};

export default Details;
