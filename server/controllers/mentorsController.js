import mentorModel from "../models/mentorModel.js";
import {
  assignStudent,
  submitStudents,
  removeStudent,
} from "../services/mentorServices.js";

export const getMentors = async (req, res) => {
  try {
    const allMentors = await mentorModel.find();
    console.log("api hit successful");
    res.status(200).json(allMentors);
  } catch (error) {
    res.status(404).json({
      message:
        error.message + "this error is from controllers/mentorsController.js",
    });
  }
};

export const createMentor = async (req, res) => {
  const {
    name,
    profession,
    mentorID,
    mentorEmailID,
    assignedStudents,
    submitted,
  } = req.body;
  let check = await mentorModel.findOne({ mentorID }).countDocuments();
  if (check > 0) {
    console.log("hiit");
    res.status(409);
  } else {
    const newMentor = new mentorModel({
      name,
      profession,
      mentorID,
      mentorEmailID,
      assignedStudents,
      submitted,
    });
    try {
      await newMentor.save();
      res.status(201).json(newMentor);
    } catch (error) {
      res.status(409).json({
        message:
          error.message + "this error is from controllers/mentorsController.js",
      });
    }
  }
};

export const assignMentor = async (req, res) => {
  console.log(req.body);
  const { mentorID, studentID } = req.body;
  console.log(mentorID);
  console.log(studentID);
  let targetMentor = await mentorModel.findOne({ mentorID }).countDocuments();
  if (targetMentor === 0) {
    console.log(
      "mentor not found" +
        "this error is from controller/mentorsControllerhii.js"
    );
    //  res.json({ message:"mentor not found"+"this error is from controller/mentorsController.js" });
  } else {
    let targetMentor = await mentorModel.findOne({ mentorID });
    let allStudents = targetMentor.assignedStudents;
    let size = allStudents.length;
    if (targetMentor.submitted === true || size >= 4) {
      console.log(
        "either mentor or student does not meet all the requirements" +
          "this error is from controller/mentorsController.js"
      );
    } else {
      const newMentor = assignStudent(mentorID, studentID);
      res.status(200).json(newMentor);
    }
  }
};

export const submitMentor = async (req, res) => {
  const { mentorID } = req.body;
  console.log(req.body);
  let targetMentor = await mentorModel.findOne({ mentorID }).countDocuments();
  if (targetMentor === 0) {
    console.log(
      "mentor not found" +
        "this   error is from controller/mentorsController.js"
    );
    //res.status(500).json({ message:"mentor not found"+"this error is from controller/mentorsController.js" });
  } else {
    let targetMentor = await mentorModel.findOne({ mentorID });
    let allStudents = targetMentor.assignedStudents;
    let size = allStudents.length;
    if (targetMentor.submitted === true || size > 4 || size <= 2) {
      console.log("mentor does not meet all the requirements");
    } else {
      const newMentor = submitStudents(mentorID);
      res.status(200).json(newMentor);
    }
  }
};

export const removeMentor = async (req, res) => {
  const { mentorID, studentID } = req.body;
  console.log("bosy is");
  console.log(req.body);
  let targetMentor = await mentorModel.find({ mentorID }).countDocuments();
  if (targetMentor === 0) {
    console.log(
      "mentor not found" + "this error is from controller/mentorsController.js"
    );
  } else {
    let targetMentor = await mentorModel.findOne({ mentorID });
    let allStudents = targetMentor.assignedStudents;

    if (allStudents.includes(studentID) === false) {
      console.log("this student is not assigned to this mentor");
    } else if (targetMentor.submitted === true) {
      console.log("already submitted");
    } else {
      const newMentor = removeStudent(mentorID, studentID);
      res.status(200).json(newMentor);
    }
  }
};
