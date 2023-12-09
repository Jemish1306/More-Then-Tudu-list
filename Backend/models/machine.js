import mongoose from "mongoose";        

const machineschama= new mongoose.Schema({
    id:{type:String,required:true ,trim:true},
    name:{type:String,required:true,trim:true},
    number:{type:String,required:true,trim:true},
    remark:{type:String,required:true,trim:true}

})

const machinemodel=mongoose.model("machinedata",machineschama)

export default machinemodel