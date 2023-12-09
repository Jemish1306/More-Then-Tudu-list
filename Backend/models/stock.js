import express  from "express";
import mongoose from "mongoose";

const  stockschama = new mongoose.Schema({
    id:{type:String ,required:true, trim:true},
    item:{type:String,required:true,trim:true},
    price:{type:String,required:true,trim:true},
    remark:{type:String,required:true,trim:true},
    quanty:{type:Number ,required:true,trim:true}
})

const stockmodel=mongoose.model("stockdata",stockschama)

export default stockmodel;