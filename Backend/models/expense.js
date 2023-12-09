import  Express  from "express";
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    id:{type:String,require:true ,trim:true},
    machine:{type:String,require:true,trim:true},
    stock:{type:String,require:true,trim:true},
    quantity:{type:String,require:true,trim:true},
    amount:{type:String,require:true,trim:true},
    date:{type:Date}
    // debit:{type:String,require:true,trim:true},
    
    
})


const expensemodel =mongoose.model("expensedata",expenseSchema)

export default expensemodel;