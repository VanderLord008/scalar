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
    console.log(data);
    assignedIDs = data.assignedStudents;
    dispatch(setMentor(data));
    findAssignedStudents(data);
    findRemainingStudents(data);
    navigate("/details");
  };

  const allStudents = useSelector((state) => state.students.totalStudents);

  const findAssignedStudents = () => {
    let temp = [];
    for (let index = 0; index < assignedIDs.length; index++) {
      let sid = assignedIDs[index];
      console.log("sid is " + sid);
      let assigned = false;
      for (let i1 = 0; i1 < allStudents.length; i1++) {
        let newID = allStudents[i1].studentID;
        if (newID === sid) {
          assigned = true;
          temp.push(allStudents[i1]);
          break;
        }
      }
    }
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
    dispatch(getRemainingStudents(temp));
  };

  const currentMentor = useSelector((state) => state.mentors.currentMentor);
  useEffect(() => {
    if (data.submitted === true) {
      setSubmitted(true);
    }
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.textArea}>
        <h2>
          {data.name} is a {data.profession}
        </h2>
        <p>mentorID : {data.mentorID}</p>
      </div>
      {!submitted ? (
        <button onClick={() => selectionHandler({ data })}>login</button>
      ) : (
        <div className={styles.textArea}>
          <h2>you have already submitted</h2>
        </div>
      )}
    </div>
  );
};

const list = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1645697272816-399d4eef3c45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Lueka Baauno",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1640622304326-db5e15903ab4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    name: "John Roberts",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1645389776061-01e3b6414546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    name: "Angela Dalonche",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1597091595753-3fff7ff7c349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwaW4lMjBuZWVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dolcha Borch",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dolcha Borch",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1507206130118-b5907f817163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dolcha Borch",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1610631066894-62452ccb927c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzV8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dolcha Borch",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dolcha Borch",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dolcha Borch",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dolcha Borch",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dolcha Borch",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Dolcha Borch",
  },
];

export default MentorCard;
