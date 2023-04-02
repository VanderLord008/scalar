import studentModel from "../models/studentModel.js";

export const getStudents = async (req, res) => {
  try {
    const allStudents = await studentModel.find();
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({
      message: error.message + "this error is from controllers/students.js",
    });
  }
};

export const createStudent = async (req, res) => {
  //creating a body out of the request
  const {
    name,
    studentID,
    StudentEmailID,
    physicsMarks,
    chemistryMarks,
    mathsMarks,
    assigned,
    submitted,
  } = req.body;
  let check = await studentModel.find({ studentID }).countDocuments();
  if (check > 0) {
    res.status(409);
  } else {
    //creating new student
    const newStudent = new studentModel({
      name,
      studentID,
      StudentEmailID,
      physicsMarks,
      chemistryMarks,
      mathsMarks,
      assigned,
      submitted,
    });
    try {
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(409).json({
        message: error.message + "this error is from controllers/students.js",
      });
    }
  }
};

export const updateStudent = async (req, res) => {
  //getting all the variables out of the request body
  const {
    name,
    studentID,
    StudentEmailID,
    physicsMarks,
    chemistryMarks,
    mathsMarks,
    assigned,
    submitted,
  } = req.body;
  let targetStudent = await studentModel
    .findOne({ studentID })
    .countDocuments();
  if (targetStudent === 0) {
    console.log(
      "student not found" + "this error is from controller/studentController.js"
    );
  } else {
    let newStudent = await studentModel.updateOne(
      { studentID },
      {
        chemistryMarks: chemistryMarks,
        physicsMarks: physicsMarks,
        mathsMarks: mathsMarks,
      }
    );
    res.status(200).json(newStudent);
  }
};
