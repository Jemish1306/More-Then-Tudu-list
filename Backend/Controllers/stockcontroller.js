import stockmodel from "../models/stock.js";

class Stockcontroller {

  static getAllstock = async (req, res) => {
    try {
      const result = await stockmodel.find({})
      res.send(result)
    } catch (error) {
      console.log(error)
    }

  }




  static stockAllDoc = async (req, res) => {
    try {
      const { id, item, price, remark, quanty } = req.body;
      const result = await stockmodel.create({
        // id: Math.floor(Math.random() * 10000),
        id,
        item,
        price,
        remark,
        quanty,
      });
      res.send(result)
      console.log('result for stock alldoc :>> ', result);
    } catch (error) {
      console.log(error)
    }
  };


  static deletestock = async (req, res) => {


    try {

      const userId = req.params.id;

      console.log("stockdelete", userId)



      const deletestock = await stockmodel.findOneAndDelete({ id: userId });


      console.log('deletestock', deletestock)

      if (deletestock) {
        return res.status(200).json({ success: true, message: "stock deleted successfully" })

      }

      return res.status(400).json({ success: false, message: "stock not deleted" });

    } catch (error) {

      res.status(500).json('error deleting srock');

    }

  }



  static editstock = async (req,res) => {

    try {
      const userid = req.params.id
      console.log('editstock userid', userid)

      const { item, price, remark, quanty } = req.body;

      const existingstock = await stockmodel.findOne({ id:userid })


      if (!existingstock) {
        return res.status(404).json({message:"stock not found"})
        
      }

      existingstock.item = item || existingstock.item;
      existingstock.price =price || existingstock.price;
      existingstock.remark = remark || existingstock.remark;
      existingstock.quanty =quanty || existingstock.quanty;

      const updateStock = await existingstock.save();

      return res.status(200).json({message:"stock data update succecfully"})


    } catch (error) {
      return res.status(500).json({message:"stock not not upadated"})

    }

  }


}

export default Stockcontroller