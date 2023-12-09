import React, { Children, createContext, useContext, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { useDispatch } from "react-redux";
import FilterContext from "./Expense.jsx";

import { Radio } from "@mui/material";




export default function SearchableSelect({ value }) {
  const [stockData, setStockData] = useState([]);

  const [machineData, setMachineData] = useState([]);

  const [selectedStock, setSelectedStock] = useState(null);

  const [selectedMachine, setSelectedMachine] = useState(null);

  const [selectedValue, setSelectedValue] = React.useState("a");

  const [quantity, setQuantity] = useState("");

  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();


 

  useEffect(() => {
    axios
      .get("http://localhost:3229/getstock")
      .then((res) => {
        setStockData(res.data);
        console.log("api get stock", res.data);
      })
      .catch((error) => {
        console.log("error stock featch", error);
      });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get("http://localhost:3229/machineget")
      .then((res) => {
        setMachineData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const Stock = [];

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);

    const stockPrice = selectedStock ? selectedStock.price : 0;
    const newAmount = newQuantity * stockPrice;

    setAmount(newAmount);
  };

  const selectedMachineTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }
    return (
      <span>{selectedMachine ? selectedMachine.name : props.placeholder}</span>
    );
  };

  const MachineOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };
  const selectedStockTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.item}</div>
        </div>
      );
    }

    return (
      <span>{selectedStock ? selectedStock.item : props.placeholder}</span>
    );
  };

  const stockOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.item}</div>
      </div>
    );
  };

  return (
    <>
      <div className="card flex  justify-center items-center flex-col">
        <label className="w-full text-start font-medium text-sm ">
          Machine
        </label>
        <Dropdown
          value={value}
          onChange={(e) => setSelectedMachine(e.value)}
          options={machineData}
          optionLabel="machine"
          placeholder="Selected a Machine"
          filter
          valueTemplate={selectedMachineTemplate}
          itemTemplate={MachineOptionTemplate}
          className="w-full md:w-14rem border rounded-lg"
        />
      </div>

      <div className="card flex justify-center w-full  flex-col pt-4">
        <label className="w-full text-start font-medium text-sm">Stock</label>
        <Dropdown
          value={value}
          onChange={(e) => {
            setSelectedStock(e.value);
          }}
          options={stockData}
          optionLabel="item"
          placeholder="Select a Stock"
          filter
          valueTemplate={selectedStockTemplate}
          itemTemplate={stockOptionTemplate}
          className="w-full md:w-14rem border rounded-lg "
        />
      </div>

      <div className="w-full justify-center items-center flex flex-col pt-6 ">
        <label className="w-full text-start font-medium text-sm ">
          Quantity
        </label>
        <input
          type="text"
          className="w-full  border h-12 rounded-lg pl-2 "
          name="quantity"
          // value={inputdata.quantity}
          // onChange={(e) => {
          //   setQuantity(e.target.value);
          //   setInputdata({
          //     ...inputdata,
          //     quantity: e.target.value,
          //   });
          // }}
          onChange={handleQuantityChange}
        />
      </div>

      <div className=" w-full justify-center items-center flex flex-col pt-6">
        <label className="w-full text-start items-start font-medium text-sm">
          Amount
        </label>
        <input
          className="w-full  border h-12 rounded-lg pl-2 "
          value={amount}
          readOnly
        />
      </div>
      <div className=" flex flex-col pt-6">
        <label className="font-medium text-sm   pt-2 pl-1">Status</label>
        <div className="flex ">
          <Radio
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
          />
          <span className="pt-3 text-sm font-medium">Active</span>
          <Radio
            checked={selectedValue === "b"}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            inputProps={{ "aria-label": "B" }}
          />
          <span className="pt-3 text-sm font-medium">Inactive</span>
        </div>
      </div>
      <div className="pt-4 pr-4">
        <button
          className=" border border-dashed border-green-500 rounded-md text-green-500 w-24 h-8 hover:bg-green-100 text-sm "
          // onClick={hendalsubmit}
        >
          <span className="icon-check1 pr-2"></span>
          Save
        </button>
      </div>
      <div className="pt-4 ">
        <button
          className=" border border-dashed border-red-500 rounded-md text-red-500 w-24 h-8 hover:bg-red-100 text-sm"
          // onClick={handleoff}
        >
          <span className="icon-clear1 pr-2"></span>
          Cancel
        </button>
      </div>
    </>
   
  );

}
                