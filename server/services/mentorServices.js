import mentorModel from "../models/mentorModel.js";
import studentModel from "../models/studentModel.js";
import { jsPDF } from "jspdf";

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
      await mentorModel.updateOne(
        { mentorID },
        { $push: { assignedStudents: studentID } },
        { new: true, runValidators: true }
      );
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
  console.log(mentorID);
  await mentorModel.updateOne({ mentorID }, { submitted: true }, { new: true });
  let targetMentor = await mentorModel.findOne({ mentorID });
  let targetStudents = targetMentor.assignedStudents;
  for (let index = 0; index < targetStudents.length; index++) {
    await studentModel.updateOne(
      { studentID: targetStudents[index] },
      { submitted: true }
    );
  }

  const doc = new jsPDF();
  for (let index = 0; index < targetStudents.length; index++) {
    // let name = targetStudents[index].name;
    let studentID = targetStudents[index].studentID;
    // let physicsMarks = targetStudents[index].physicsMarks;
    // let chemistryMarks = targetStudents[index].chemistryMarks;
    // let mathsMarks = targetStudents[index].mathsMarks;
    doc.text(`${studentID}`, 10, 20 * (index + 1) + 10);
    doc.text(`id:${studentID}`, 10, 20 * (index + 2));
  }
  doc.save(`TES.pdf`);

  return targetMentor;
};

export const removeStudent = async (mentorID, studentID) => {
  let targetMentor = await mentorModel.findOne({ mentorID });
  let allStudents = targetMentor.assignedStudents;
  let sid = studentID;
  let remainingStudents = allStudents.filter((studentID) => studentID != sid);
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
