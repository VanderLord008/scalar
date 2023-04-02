import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMentor } from "../store/mentorSlice";
import {
  getAssignedStudents,
  getRemainingStudents,
} from "../store/studentSlice";
import { useNavigate } from "react-router-dom";

import styles from "./mentorCard.module.css";

const MentorCard = ({ data }) => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let assignedIDs = [];

  const selectionHandler = ({ data }) => {
    assignedIDs = data.assignedStudents;
    //updating our current selected mentor in the redux store
    dispatch(setMentor(data));
    //get the students that are assigned to this mentor
    findAssignedStudents(data);
    //get the students that are not assigned to this mentor
    findRemainingStudents(data);
    navigate("/details");
  };

  const allStudents = useSelector((state) => state.students.totalStudents);

  const findAssignedStudents = () => {
    let temp = [];
    for (let index = 0; index < assignedIDs.length; index++) {
      let sid = assignedIDs[index];
      for (let i1 = 0; i1 < allStudents.length; i1++) {
        let newID = allStudents[i1].studentID;
        if (newID === sid) {
          temp.push(allStudents[i1]);
          break;
        }
      }
    }
    //update the redux store
    dispatch(getAssignedStudents(temp));
  };

  const findRemainingStudents = () => {
    let temp = [];
    for (let index = 0; index < allStudents.length; index++) {
      let newID = allStudents[index].studentID;
      let exist = false;
      for (let i1 = 0; i1 < assignedIDs.length; i1++) {
        let sid = assignedIDs[i1];
        if (newID === sid) {
          exist = true;
          continue;
        }
      }
      if (exist === false) {
        temp.push(allStudents[index]);
      }
    }
    //update redux store
    dispatch(getRemainingStudents(temp));
  };

  useEffect(() => {
    if (data.submitted === true) {
      setSubmitted(true);
    }
  }, [data.submitted]);

  return (
    <div className={styles.card}>
      <div className={styles.textArea}>
        <h2>
          {data.name} is a {data.profession}
        </h2>
        <p>mentorID : {data.mentorID}</p>
      </div>

      <div className={styles.buttonStyles}>
        {!submitted ? (
          <button onClick={() => selectionHandler({ data })}>login</button>
        ) : (
          <div className={styles.textArea}>
            <h2>you have already submitted</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorCard;
