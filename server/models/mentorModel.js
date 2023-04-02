import mongoose from "mongoose";

const mentorSchema=mongoose.Schema({
    name: {type:String,require:true},
    profession: {type:String,require:true},
    mentorID: {type:String,require:true},
    mentorEmailID:{type:String,require:true},
    assignedStudents: [String],
    submitted:{type:Boolean, default:false}
})

const mentorModel = mongoose.model('mentorModel', mentorSchema);
export default mentorModel;