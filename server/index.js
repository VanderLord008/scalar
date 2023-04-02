import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import mentorsRoutes from "./routes/mentorsRoutes.js";
import studentsRoutes from "./routes/studentsRoutes.js";

const app = express();
dotenv.config();
app.use(cors());

//these variables come from dotenv file but for now we are hardcoding it
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.port || 5000;

//connecting to the database
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"))
  .catch((err) => console.log(err.message));

app.use(express.json());

//implementing all the different routes
app.use(mentorsRoutes);
app.use(studentsRoutes);

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
