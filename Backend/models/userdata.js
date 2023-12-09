import mongoose  from "mongoose";

const userschema=new mongoose.Schema({
    id:{type:String, required:true,trim:true},
    
    name:{type:String ,required:true,trim:true},
    email:{type:String, required:true,trim:true},   
    mobile:{type:Number,required:true,trim:true},
    password:{type:String ,required:true,trim:true},
    profile:{type:String}
});








//model 
const usermodel =mongoose.model("userdata",userschema);


export default usermodel 
