import mongoose from "mongoose";



const connectdb= async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS={
            dbname:'college'
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("connected successfully")
       
    } catch (error) {
        console.log( 'not connected',error)
        
    }
};
export default connectdb;