import mongoose from "mongoose";

const studentSchema=mongoose.Schema({
    name: {type:String,require:true},
    studentID: {type:String,require:true},
    studentEmailID: {type:String,require:true},
    physicsMarks:{type:Number,require:true},
    chemistryMarks:{type:Number,require:true},
    mathsMarks:{type:Number,require:true},
    assigned:{ type: Boolean, default:false},   
    submitted: { type: Boolean, default: false} 
    })

const studentModel = mongoose.model('studentModel', studentSchema);
export default studentModel;