import { match } from "assert";
import machinemodel from "../models/machine.js";

class machinecontroller {

  static getmachineDoc=async (req,res)=>{
    try {
      const result =await machinemodel.find({})
      res.send(result)
    } catch (error) {
      console.log(error)
      
    }
  }




  static machinealldoc = async (req, res) => {
    try {
      const { name, number, remark } = req.body;
      const result = await machinemodel.create({
        id: Math.floor(Math.random() * 100000),
        name,
        number,
        remark,
      });
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };



static deletemachine = async (req,res) =>{
  try {
    
    const userId = req.params.id;
    const machinedelete = await machinemodel.findOneAndDelete({id:userId});
    if(machinedelete){
      return res.status(200).json({success:true,message:"machine deleted successfully"})
    }

    res.status(400).send('User not deleted');

  } catch (error) {

    res.status(500).send('Error: ' + error.message);
    
  }
}

static editmachine = async (req, res)=>{
  try {
    const userid = req.params.id

    console.log("editmachine id",userid)
    const {name ,number,remark}= req.body

    const existingMachine = await machinemodel.findOne({id:userid});

    if (!existingMachine) {
      return res.status(404).json({message:"machine not found"})

    }

    existingMachine.name=name||existingMachine.name;
    existingMachine.number=number||existingMachine.number;
    existingMachine.remark=remark||existingMachine.remark;

    const updaedmachine = await existingMachine.save();

    return res.status(200).json({message:"machine data update succecfully"})


  } catch (error) {
    return req.status(500).json({message:"machine not updated"})
  }

}



}

export default machinecontroller;
