import mentorModel from "../models/mentorModel.js";
import studentModel from "../models/studentModel.js";
import { jsPDF } from "jspdf";

//method to assign the student
export const assignStudent = async (mentorID, studentID) => {
  let targetStudent = await studentModel
    .findOne({ studentID })
    .countDocuments();
  if (targetStudent === 0) {
    console.log("student not found");
  } else {
    let targetStudent = await studentModel.findOne({ studentID });
    if (targetStudent.assigned === true || targetStudent.submitted === true) {
      console.log("student does not meet all the requirements");
    } else {
      //updating the mentor values
      await mentorModel.updateOne(
        { mentorID },
        { $push: { assignedStudents: studentID } },
        { new: true, runValidators: true }
      );
      //updating the student values
      await studentModel.updateOne(
        { studentID },
        { assigned: true },
        { new: true }
      );
      return targetStudent;
    }
  }
};

export const submitStudents = async (mentorID) => {
  //updaing the mentor
  await mentorModel.updateOne({ mentorID }, { submitted: true }, { new: true });
  //getting mentor document
  let targetMentor = await mentorModel.findOne({ mentorID });
  //getting an array of all the students that are assigned to this mentor
  let targetStudents = targetMentor.assignedStudents;
  //getting document for all those students
  for (let index = 0; index < targetStudents.length; index++) {
    await studentModel.updateOne(
      { studentID: targetStudents[index] },
      { submitted: true }
    );
  }

  //creating a pdf file
  const doc = new jsPDF();
  for (let index = 0; index < targetStudents.length; index++) {
    // let name = targetStudents[index].name;
    let studentID = targetStudents[index];
    // let physicsMarks = targetStudents[index].physicsMarks;
    // let chemistryMarks = targetStudents[index].chemistryMarks;
    // let mathsMarks = targetStudents[index].mathsMarks;

    //these 10 20 are for representing the space that we should leave in the document for formatting properly
    doc.text(`${studentID}`, 10, 20 * (index + 1) + 10);
    doc.text(`id:${studentID}`, 10, 20 * (index + 2));
  }
  doc.save(`TES.pdf`);
  console.log("pdf generated");
  return targetMentor;
};

export const removeStudent = async (mentorID, studentID) => {
  let targetMentor = await mentorModel.findOne({ mentorID });
  let allStudents = targetMentor.assignedStudents;
  let sid = studentID;
  //getting all the students of this mentor except the one we want to remove
  let remainingStudents = allStudents.filter((studentID) => studentID != sid);
  //updating the new remaining students
  targetMentor = await mentorModel.updateOne(
    { mentorID },
    { assignedStudents: remainingStudents },
    { new: true }
  );
  await studentModel.updateOne(
    { studentID },
    { assigned: false },
    { new: true }
  );
  return targetMentor;
};
