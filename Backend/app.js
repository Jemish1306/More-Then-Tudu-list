import express from 'express';


const app=express();

import  web from "./routes/web.js"

import cors from "cors"
import connectdb from './DB/connectdb.js';

import punycode from 'punycode';




app.use(express.json())
app.use(cors())



app.use('/',web)


// const punycode = require('punycode'); 
const port =process.env.PORT || '3229'
const DATABASE_URL= process.env.DATABASE_URL || "mongodb://localhost:27017";
// const DATABASE_URL = 'mongodb://127.0.0.1:27017';


connectdb(DATABASE_URL);    



app.listen(port,()=>{
    console.log(`server at listening ${port}`)
})