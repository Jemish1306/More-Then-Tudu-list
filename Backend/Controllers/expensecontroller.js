import { log } from "console";
import expensemodel from "../models/expense.js";

class ExpenseController {

static getAllexpense = async (req,res)=>{                  // req.body = anydata, .params = id pass ,. qurey=condition
    try {
       
       
        const result = await expensemodel.find({})
        res.send(result)
    } catch (error) {
        console.log(error)
        
    }
}

static expenseAlldoc = async (req,res)=>{
    try {
        const {id,machine,stock ,quantity,amount,date}= req.body;
        const result =await expensemodel.create({
            id,machine,stock ,quantity,amount,date
        });
        console.log('result :>> ', result);
        // res.status(200).send("expense data backend save",result);
        res.send(result);
    } catch (error) {
        console.log('error in back getallData :>> ', error);
        
    }

}

static deleteexpense = async (req,res)=>{
    try {
        const userId=req.params.id;

        console.log("expense delete id",userId)

        const deleteexpense = await expensemodel.findOneAndDelete({id:userId})

        console.log("deleted expense user", deleteexpense)

        if (deleteexpense) {
                return res.status(200).json({succes:true,message:"expensedata deletd successfully   "})
        }

        if (!deleteexpense) {
            return res.status(400).json({succes:false,message:"expensedata not deleted"})
        }



    } catch (error) {
        res.status(500).json({succes:false,error})
    }

}

 static editexpense = async (req,res)=>{
    try {
        const userId=req.params.id;
        console.log("editexpense id",userId)

        const {id, machine, stock ,quantity,amount}=req.body;

        const existingexpense = await expensemodel.findOne({id:userId}) 

        // if (existingexpense) {
        //     return res.status(200).json({suscces:true,message:"exisitingexpense edited sussfully"})
        // }

        if ( !existingexpense) {
            return res.status(404).json({suscces:false,message:"exisitingexpense"})
        }

        existingexpense.machine = machine || existingexpense.machine;
        existingexpense.stock  = stock || existingexpense.stock;
        existingexpense.quantity= quantity|| existingexpense.quantity;
        existingexpense.amount = amount || existingexpense.amount;
        // existingexpense.debit = debit || existingexpense.debit;

        const updateExpense = await existingexpense.save();

        return res.status(200).json({message:"expense update succefully"})



    } catch (error) {

        return res.status(500).json({message:"expense not backend updated"})
        
    }


 };

 static getAllexpenseWithDate = async (req, res) => {
    try {
        const { startDate, endDate,machine } = req.params;              // get ma query
        console.log('req.params :>> ', startDate);
        
        // Assuming your date field in the expense model is named 'date'
        const result = await expensemodel.find({
            date: {
              $gte: new Date(Date.parse(startDate)),
              $lte: new Date(Date.parse(endDate))
            },
            machine:machine
          });

       
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
}

}
 export default ExpenseController