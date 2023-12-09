import fs from "fs"
import collegemodel from "../models/userdata.js";
import schoolmodel from "../models/userdata.js"
import usermodel from "../models/userdata.js";

// import User from '../models/User.js'
// import usermodel from "../models/userdata.js";  



// const fs = require('fs')

class userController{
    static getAllDoc= async (req,res)=>{
        try {
            const result= await usermodel.find({})
            res.send(result)
        } catch (error) {
            console.log(error)
            
        }

    }

    
        static userAllDoc = async(req,res)=>{
            try {
              const {id,name,email,mobile,password}= req.body

              
              const result =  await usermodel.create({
                // id:Math.floor(Math.random() * 100000), 
                 id,
                name,
                mobile,
                email,
                password,              
              })
                res.send(result)
            } catch (error) {
                console.log(error) 
                
            }
        }

        static userdelete = async (req,res)=>{

                     
            try {
            
                const userId = req.params.id;

                const deleteuser = await usermodel.findOneAndDelete({ id: userId });

        
                 console.log('deleteuser', deleteuser)
  
                if (deleteuser) {
                    return res.status(200).json({success:true,message:"User deleted successfully"})
                    
                }   

                return res.status(400).json({ success: false, message: "User not deleted" });
       
                } catch (error) {
        
                    res.status(500).send('error deleting user');
                
            }
        
         }
         static useredit= async (req,res)=>{
            try {
                const userid=req.params.id

                console.log("edituser id",userid)

                const {name,email,mobile,password} = req.body;

                const existingUser = await usermodel.findOne({id:userid});

                if (! existingUser) {
                    return res.status(404),json({massage:"User not found"})
                }

                existingUser.name = name || existingUser.name;
                existingUser.email = email || existingUser.email;
                existingUser.mobile= mobile || existingUser.mobile;
                existingUser.password =password || existingUser.password;


                const updateUser = await existingUser.save();

                return res.status(200).json({message:"User data updated successfully"})

                
               
                

            } catch (error) {

                return res.status(500).json({message: error.message})
            }
         }
    
}

export default userController
