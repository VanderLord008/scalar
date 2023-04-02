import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import mentorsRoutes from './routes/mentorsRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();

app.use(cors());

const CONNECTION_URL="mongodb://127.0.0.1:27017/cscorner";
const PORT=process.env.port||5000;


mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("database connected"))
.catch((err)=>console.log(err.message+"hii"));

app.use(express.json())
app.use(mentorsRoutes);
app.use(studentsRoutes);


app.listen(PORT, ()=>{
    console.log(`app listening on ${PORT}`);
})