import express from "express";

import {
  getMentors,
  createMentor,
  assignMentor,
  submitMentor,
  removeMentor,
} from "../controllers/mentorsController.js";
const router = express.Router();

router.get("/mentors", getMentors);
router.post("/mentors", createMentor);
router.post("/mentors/assign", assignMentor);
router.post("/mentors/submit", submitMentor);
router.post("/mentors/remove", removeMentor);

export default router;
