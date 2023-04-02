import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMentors } from "../store/mentorSlice";
import { createMentor, fetchMentors, fetchStudents } from "../api";
import { getTotalStudents } from "../store/studentSlice";
import MentorCard from "../components/MentorCard";

import styles from "./home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const [mentors, setMentors] = useState([]);
  const [createNewMentor, setCreateNewMentor] = useState(false);
  const [newMentorCreated, setNewMentorCreated] = useState(false);
  const [newMentorName, setNewMentorName] = useState("");
  const [newMentorProfession, setNewMentorProfession] = useState("");
  const [newMentorMentorID, setNewMentorMentorID] = useState("");
  const [newMentorMentorEmailID, setNewMentorMentorEmailID] = useState("");

  //we want to get the data from the backend as soon as the homepage loads
  useEffect(() => {
    async function fetchMentorData() {
      const { data } = await fetchMentors();
      setMentors(data);
      dispatch(addMentors(data));
    }
    async function fetchStudentsData() {
      const { data } = await fetchStudents();
      dispatch(getTotalStudents(data));
    }
    fetchMentorData();
    fetchStudentsData();
  }, [dispatch, newMentorCreated]);

  //creating a new mentor
  const handleCreation = async (e) => {
    e.preventDefault();
    let newMentor = {
      name: newMentorName,
      profession: newMentorProfession,
      mentorID: newMentorMentorID,
      mentorEmailID: newMentorMentorEmailID,
      assignedStudents: [],
      submitted: false,
    };
    await createMentor(newMentor);
    setNewMentorCreated(true);
    setNewMentorName("");
    setNewMentorProfession("");
    setNewMentorMentorID("");
    setNewMentorMentorEmailID("");
    setCreateNewMentor(false);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.heading}>Mentors</div>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            {mentors.map((mentor) => (
              <MentorCard data={mentor} key={mentor._id} />
            ))}
          </div>
        </div>
        <div className={styles.heading}>create new mentors</div>
        {!createNewMentor && (
          <button onClick={() => setCreateNewMentor(true)}>create</button>
        )}
        {createNewMentor && (
          <div className={styles.formContainer}>
            {/* form to create a new mentor */}
            <form
              action=""
              method="post"
              autoComplete="off"
              noValidate
              onSubmit={handleCreation}
            >
              <div className={styles.head}>
                <h2 className={styles.text}>name</h2>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="name"
                    value={newMentorName}
                    onChange={(e) => setNewMentorName(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.head}>
                <h2 className={styles.text}>profession</h2>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="profession"
                    value={newMentorProfession}
                    onChange={(e) => setNewMentorProfession(e.target.value)}
                  />{" "}
                </div>
              </div>

              <div className={styles.head}>
                <h2 className={styles.text}>mentorID</h2>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="mentorID"
                    value={newMentorMentorID}
                    onChange={(e) => setNewMentorMentorID(e.target.value)}
                  />{" "}
                </div>
              </div>
              <div className={styles.head}>
                <h2 className={styles.text}>emailID</h2>
                <div className={styles.inputField}>
                  <input
                    type="email"
                    name="emailID"
                    value={newMentorMentorEmailID}
                    onChange={(e) => setNewMentorMentorEmailID(e.target.value)}
                  />{" "}
                </div>
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                onClick={handleCreation}
              >
                create
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
