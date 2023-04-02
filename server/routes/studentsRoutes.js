import express from "express";

import {
  getStudents,
  createStudent,
  updateStudent,
} from "../controllers/studentsController.js";
const router = express.Router();

router.get("/students", getStudents);
router.post("/students", createStudent);
router.post("/students/update", updateStudent);
export default router;
