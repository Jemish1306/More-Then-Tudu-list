import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import loop from "../img/Loopbots Logo 001 - Copy.png";
import { RiAdminLine } from "react-icons/ri";

// import edit2 from "../img/edit2"
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import search from "../img/search.png";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../asset/css/icomoon.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addexpense,
  editexpense,
  deleteexpense,
} from "../Redux/adminUserSlice";
import { Radio } from "@mui/material";
import SearchableSelect from "./SearchableSelect";

import { Dropdown } from "primereact/dropdown";
import FilterDemo from "./SearchableSelect";
import StockSelection from "./SearchableSelect";

import { Context } from "../Context/Context";
import { fetchAdminUser } from "../Redux/middlewear.js";



import { Calendar } from "primereact/calendar";
import FilterData from "./FilterData.jsx";


const Expense = () => {
  const adminUsers = useSelector((state) => state.adminUser.adminuser1);
  const status = useSelector((state) => state.adminUser.status);
  const dispatch = useDispatch();

  const context = createContext();

  const Navigate = useNavigate();

  const data = {
    id: Math.floor(Math.random() * 100000),
    date: new Date().toISOString(),
    machine: "",
    stock: "",
    quantity: "",
    amount: "",
  };
  // console.log('mainid',data)

  const [showForm, setShowForm] = useState(false);
  const [inputdata, setInputdata] = useState(data);
  const [adminuser, setAdminuser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [selectedValue, setSelectedValue] = React.useState("a");

  const [editbutton, setEditbutton] = useState();

  const [machineData, setMachineData] = useState([]);

  const [stockData, setStockData] = useState([]);

  const [quantity, setQuantity] = useState(0);

  const [selectedStock, setSelectedStock] = useState(stockData[0]);

  const [selectedMachine, setSelectedMachine] = useState(machineData[0]);

  const [stockPrice, setStockPrice] = useState(0);

  const [startDate, setStartDate] = useState(null);

  const [dateRange, setDateRange]=useState([]);

  const [endDate, setEndDate] = useState(null);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDateTime = currentDateTime.toLocaleString("en", options);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAdddata = () => {
    setShowForm(true);
    setShowForm(!showForm);
    setIsEditing(false);
    setInputdata(data);
    setEditbutton(false);
  };
  const hendaldata = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };

  const handleStockChange = (e) => {
    const selectedStock = e.value;
    setSelectedStock(selectedStock);
    setStockPrice(selectedStock.price); // Assuming the stock object has a 'price' property
    setInputdata({
      ...inputdata,
      stock: selectedStock.item,
    });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);

    // Calculate the amount based on quantity and stock price
    const amount = newQuantity * stockPrice;
    setInputdata({
      ...inputdata,
      quantity: newQuantity,
      amount: amount,
    });
  };

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get("http://localhost:3229/machineget")
      .then((res) => {
        // dispatch(setAdminuser(res.data));
        setMachineData(res.data);
        console.log("api get machine data :>> ", res.data);
      })
      .catch((error) => {
        console.log("Error fetching machine data:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get("http://localhost:3229/getstock")

      .then((res) => {
        setStockData(res.data);
        console.log("api get stock data:>>", res.data);
      })
      .catch((error) => {
        console.log("error featcing stock data", error);
      });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`http://localhost:3229/expenseget`)
      .then((res) => {
        setAdminuser(res.data);
        console.log("api get Expense data:>> ", res.data);
      })
      .catch((error) => {
        console.log("error fetching expensedata", error);
      });
  }, [dispatch, startDate, endDate]);

  // useEffect(() => {
  //   const apiUrl = startDate && endDate
  //     ? `http://localhost:3229/expenseget?startDate=${startDate}&endDate=${endDate}`
  //     : 'http://localhost:3229/expenseget';

  //   axios.get(apiUrl)
  //     .then((res) => {
  //       setAdminuser(res.data);
  //       console.log('Fetched data:', res.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching data", error);
  //     });
  // }, [startDate, endDate, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdminUser());
    }
  }, [dispatch, status]);

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

  const hendalsubmit = (e, userId) => {
    e.preventDefault();
    const currentDate = formattedDateTime;

    if (isEditing) {
      // const updatedInputData = {
      //   ...inputdata,
      //   // amount: amount,
      //   // quantity: quantity,
      // };

      dispatch(editexpense({ id: inputdata.id, data: inputdata }));
      const updateadminUser = adminuser.map(
        (user) => (user.id === inputdata.id ? inputdata : user),

        axios
          .put(`http://localhost:3229/editexpense/${inputdata.id}`, inputdata)
          .then((res) => {
            console.log("update react edit user", res.data);
          })
          .catch((error) => {
            console.log("updateuser error", error);
          })
      );
      setAdminuser(updateadminUser);
    } else {
      // const updatedInputData = {
      //   ...inputdata,
      //   // amount: amount,
      //   // quantity: quantity,
      // };
      // const newQuantity = e.target.value;
      // setQuantity(newQuantity)
      dispatch(addexpense({ ...inputdata }));
      const updateadminUser = [...adminuser, inputdata];
      setAdminuser(updateadminUser);
      console.log("currentDate :>> ", currentDate);

      axios
        .post("http://localhost:3229/expense", {
          ...inputdata,
          // amount: amount,
          quantity: quantity,
        })
        .then((res) => {
          console.log("data set api", res.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }

    setInputdata(data);
    setShowForm(false);
    setIsEditing(false);
    // setInputdata(userId);
  };

  const hendaleditform = (userId) => {
    setShowForm(true);
    setIsEditing(!isEditing);
    setInputdata(userId);
    setEditbutton(!editbutton);
  };

  const handleDelete = (userId) => {
    dispatch(deleteexpense(userId));

    const updatedAdminUser = adminuser.filter((user) => user.id !== userId);
    setAdminuser(updatedAdminUser);

    axios
      .delete(`http://localhost:3229/deleteexpense/${userId}`)
      .then((res) => {
        console.log("deleteed react", res.data);
      })
      .catch((error) => {
        console.log("deleteerror", error);
      });
  };

  //     const handleFilter=()=> {
  //       // if (!startDate || !endDate || !(startDate instanceof Date) || !(endDate instanceof Date)) {
  //       //   console.error("Invalid date objects");
  //       //   return;
  //       // }
  //         axios
  //           .get(
  //             `http://localhost:3229/expenseget?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
  //           )

  //           .then((res) => {
  //             setAdminuser(res.data);
  //             console.log("setAdminuser date:>> ", res.data);
  //           })
  //           .catch((error) => {
  //             console.log("error fetching data", error);
  //           });
  //           console.log('Start Date:', startDate);
  //           console.log('End Date:', endDate);

  // }

  const handleFilter = () => {
    // const formattedStartDate = dateRange.toISOString();
    // const formattedEndDate = endDate.toISOString();

    if (dateRange && dateRange.length===2) {
      const startDate = dateRange[0];
      const endDate = dateRange[1];
      
      axios
        .get(
          `http://localhost:3229/expenseget?startDate=${startDate}&endDate=${endDate}`
        )
        
        .then((res) => {
          const filteredAdminUsers = res.data.filter((user) => {
            const userDate = new Date(user.date);
            return userDate >= startDate && userDate <= endDate;
          });
  
          setAdminuser(filteredAdminUsers);
          console.log("Filtered AdminUsers by date: ", filteredAdminUsers);
        })
        .catch((error) => {
          console.log("Error fetching data", error);
        });
  
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
    }else{
      console.log('Please select a date range');
    }

  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleoff = () => {
    setShowForm(false);
  };

  const handleeditsave = () => {
    setEditbutton(!editbutton);
  };

  const handleDateRangeOff= ()=>{
    setDateRange([]);
    axios
    .get('http://localhost:3229/expenseget')
    .then((res) => {
      setAdminuser(res.data);
      console.log("All AdminUsers data: ", res.data);
    })
    .catch((error) => {
      console.log("Error fetching data", error);
    });


  }

  const filteredAdminUsers = adminuser
    .map((user, index) => ({
      id: user.id, // Use the index as a unique identifier (replace this with your actual unique identifier)
      machine: user.machine,
      stock: user.stock,
      quantity: user.quantity,
      amount: user.amount,
      // ... other properties
    }))
    .filter((user) => {
      const userValues = Object.values(user);
      const query = searchQuery.toLowerCase();

      // Check if any user data field (that is not undefined) contains the search query`
      return userValues.some(
        (value) =>
          value !== undefined && value.toString().toLowerCase().includes(query)
      );
    });

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "machine", headerName: "Machine", width: 150 },

    { field: "stock", headerName: "Stock", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },

    {
      field: "action",
      headerName: "Action",

      width: 150,
      renderCell: (params) => (
        <div className="w-full h-full flex   items-center  space-x-4 ">
          <span className="bg-gray-200 w-7 h-7 rounded-md justify-center items-center flex ">
            <span
              className="icon-edit-pencil w-4 h-4 flex text-gray-500 rounded-md hover:text-blue-500 items-center justify-center"
              onClick={() => {
                hendaleditform(params.row);
              }}
            ></span>
          </span>

          <span className="bg-gray-200 w-7 h-7 rounded-md justify-center items-center flex ">
            <span
              className="icon-bin2 w-4 h-4 flex text-gray-500 rounded-md hover:text-blue-500 items-center justify-center 
            "
              onClick={() => {
                handleDelete(params.row.id);
              }}
            ></span>
          </span>
        </div>
      ),
    },
  ];

  const rows = adminuser.map((user) => ({
    id: user.id,
    machine: user.machine,
    stock: user.stock,
    quantity: user.quantity,
    amount: user.amount,
  }));

  return (
    <>
      <div className="w-screen h-screen flex ">
        
        <div className=" h-full w-full items-center  flex flex-col">
          <div className="  w-full flex bg-white shadow-lg  text-end   justify-end items-center p-6">
            {/* <span className="icon-user"></span> */}
            <label className="font-bold pr-4 text-xl">Hi .administer</label>
            <RiAdminLine className="w-7 h-7 border rounded-lg bg-gray-200" />
          </div>
          <hr />
          <div className="w-full  flex   p-4 justify-between">
            <div className="flex flex-col">
              <label className="text-xl font-semibold">Expense list</label>
              <labal className="text-xs text-gray-400">
                User Mangement{" "}
                <span className="text-gray-900 font-medium">
                  {" "}
                  - Expense list
                </span>
              </labal>
            </div>
            <multipleMonthDemo />
            <div className="text-end text-lg font-semibold text-gray-600 justify-center pt-2 ">
              Today: {formattedDateTime}
            </div>
          </div>

          <div className="w-full  justify-center items-center bg-white border shadow-lg mt-2 p-10 ">
            <div className="w-full flex justify-between items-end -mt-4">
              {/* <div className=" w-auto card flex  flex-col items-center ">
                <label className="w-full text-start font-medium text-sm">
                  DateRange
                </label>
                <Calendar
                  value={startDate}
                //  onSelect={()=>handleFilter()}
                  onChange={(e) => setStartDate(e.value)}
                  numberOfMonths={2}
                  className="border rounded-lg w-32 pl-2 h-10"
                />

                <div className="card flex justify-content-center ">
                  <Calendar
                    value={dateRange}
                    onChange={(e) => setDateRange(e.value)}
                    selectionMode="range"
                    readOnlyInput
                    className="border rounded-lg w-56 pl-2 h-10"
                    numberOfMonths={2}
                  >
                    {" "}
                  </Calendar>
                </div>
              </div> */}
              {/* <div className=" w-auto card flex flex-col   items-center ml-8">
                <label className="w-full text-start font-normal text-sm ">
                  EndDate
                </label>
                <Calendar
                  value={endDate}
                  onChange={(e) => setEndDate(e.value)}
                  numberOfMonths={2}
                  className="border rounded-lg w-32 pl-2 h-10"
                />
              </div> */}
              {/* <div className="items-end flex justify-center ml-8 ">
                <button
                  className=" border border-dashed h-10  border-green-500 rounded-md text-green-500 w-24  hover:bg-green-100 text-sm "
                  type="button"
                  onClick={handleFilter}
                >
                  <span className=" icon-filter pr-2"></span>Filter
                </button>
              </div>

              <div className="items-end flex justify-center ml-8 ">
                <button
                  className=" border border-dashed h-10  border-red-500 rounded-md text-red-500 w-24  hover:bg-red-100 text-sm "
                  type="button"
                  onClick={handleDateRangeOff}
                >
                  <span className="icon-clear1 pr-2"></span>Cancal
                </button>
              </div> */}

              <div className="flex w-full h-full justify-end items-end sm:justify-center md:justify-center  lg:justify-end  md:ml-[50vh]">
                <button
                  type="button"
                  className="flex items-center justify-center border hover:text-sky-500 border-sky-500 border-dashed bg-white hover:bg-sky-100 rounded-md px-2.5 py-1 h-10 w-full sm:w-32 md:w-44 lg:w-44"
                  onClick={handleAdddata}
                >
                  <span className="items-center icon-add_circle_outline  text-sky-500 flex justify-center font-medium  rounded-full text-lg w-[20px] text-blue h-[20px]"></span>
                  <span className=" ml-1.5 text-sm flex text-sky-600 ">
                    Add Expense
                  </span>
                </button>
              </div>
            </div>

            <div className="w-full flex   mt-4 justify-between">
              <div className="w-1/2 h-full flex  justify-start">
                <ul className="flex items-center space-x-1 border rounded-lg bg-gray-200">
                  <li className="p-1.5  rounded-md   font-light text-xs ">
                    Excel
                  </li>
                  <li className="p-1.5  rounded-md  font-light text-xs">CSV</li>
                  <li className="p-1.5  rounded-md   font-light text-xs">
                    PDF
                  </li>
                  <li className="p-1.5  rounded-md   font-light text-xs">
                    Print
                  </li>
                </ul>
              </div>

              <div className="flex  bg-gray-100 rounded-lg justify-end  ">
                <span className=" items-center h-10 flex">
                  <img src={search} alt="search" className="w-8 h-8"></img>
                </span>

                <input
                  type="text"
                  className="rounded-lg w-56 h-10 bg-transparent outline-none text-sm pl-2"
                  onChange={handleSearch}
                  alt="search"
                  placeholder="Search User"
                />
              </div>
            </div>

            <div className="p-4 w-full text-center flex justify-center items-center">
              <DataGrid
                className="w-auto h-full flex text-center justify-center pl-4"
                showCellVerticalBorde
                hideColumnVerticalBorder
                // MuiDataGrid-cell--textCenter
                disableRowSelectionOnClick
                borderAxis="none"
                disableDensitySelector={true}
                disableUnderline
                rows={filteredAdminUsers}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 20]}
                sx={{
                  font: "inherit",
                  fontSize: 14,
                  border: 0,
                  borderAxis: "none",
                  width: 100,
                }}
                variant="plain"
                size="sm"
              />
            </div>
          </div>

          {showForm ? (
            <div className="w-full h-screen flex items-center justify-center fixed inset-0 z-50">
              <span className="block absolute inset-0 w-full h-full bg-black/20 backdrop-blur-sm"></span>
              <form className="relative w-full max-w-md drop-shadow-lg items-center justify-center flex z-[51]">
                <div className=" w-full h-auto border flex flex-wrap bg-white flex-col  shadow-lg rounded-lg  p-6 ">
                  <div className="flex pb-4 border-b justify-between  ">
                    <label className="text-lg font-semibold ">
                      Add Expense{" "}
                    </label>
                    <span
                      class="icon-cancel-circle text-red-500 w-6"
                      onClick={handleoff}
                    ></span>
                  </div>
                  <div className=" justify-center items-center w-full flex  flex-col ">
                    <div className=" w-full  flex flex-col pt-6">
                      {/* <SearchableSelect
                      /> */}

                      <div className="card flex  justify-center items-center flex-col">
                        <label className="w-full text-start font-medium text-sm ">
                          Machine
                        </label>
                        <Dropdown
                          value={selectedMachine}
                          onChange={(e) => {
                            setSelectedMachine(e.value);
                            setInputdata({
                              ...inputdata,
                              machine: e.value.name,
                            });
                          }}
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
                        <label className="w-full text-start font-medium text-sm">
                          Stock
                        </label>
                        <Dropdown
                          value={selectedStock}
                          // onChange={(e) => {
                          //   setSelectedStock(e.value);
                          //   setInputdata({
                          //     ...inputdata,
                          //     stock: e.target.value,
                          //   });
                          // }}
                          onChange={handleStockChange}
                          options={stockData}
                          optionLabel="item"
                          placeholder="Select a Stock"
                          filter
                          valueTemplate={selectedStockTemplate}
                          itemTemplate={stockOptionTemplate}
                          className="w-full md:w-14rem border rounded-lg "
                        />
                      </div>
                    </div>

                    <div className="w-full justify-center items-center flex flex-col pt-6 ">
                      <label className="w-full text-start font-medium text-sm ">
                        Quantity
                      </label>
                      <input
                        type="text"
                        className="w-full  border h-8 rounded-lg "
                        name="quantity"
                        value={inputdata.quantity}
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
                        className="w-full  border h-8 rounded-lg "
                        value={inputdata.amount}
                        onChange={(e) => {
                          setInputdata({
                            ...inputdata,
                            amount: e.target.value,
                          });
                        }}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className=" flex flex-col pt-6">
                    <label className="font-medium text-sm   pt-2 pl-1">
                      Status
                    </label>
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

                  <div className="w-full mt-8 pt-2 border-t flex justify-end">
                    {/* <div className="pt-4 pr-4">
                      <button
                        className=" border border-dashed border-green-500 rounded-md text-green-500 w-24 h-8 hover:bg-green-100 text-sm "
                        onClick={hendalsubmit}
                      >
                        <span className="icon-check1 pr-2"></span>
                        Save
                      </button>
                    </div> */}
                    {editbutton ? (
                      <div className="pt-4 pr-4">
                        <button
                          className=" border border-dashed border-green-500 rounded-md text-green-500 w-24 h-8 hover:bg-green-100 text-sm "
                          onClick={hendalsubmit}
                        >
                          <span className="icon-check1 pr-2"></span>
                          Save Edit
                        </button>
                      </div>
                    ) : (
                      <div className="pt-4 pr-4">
                        <button
                          className=" border border-dashed border-green-500 rounded-md text-green-500 w-24 h-8 hover:bg-green-100 text-sm "
                          onClick={hendalsubmit}
                        >
                          <span className="icon-check1 pr-2"></span>
                          Save
                        </button>
                      </div>
                      // ""
                    )}
                    <div className="pt-4 ">
                      <button
                        className=" border border-dashed border-red-500 rounded-md text-red-500 w-24 h-8 hover:bg-red-100 text-sm"
                        onClick={handleoff}
                      >
                        <span className="icon-clear1 pr-2"></span>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            " "
          )}
        </div>
      </div>
      
    </>
  );
};

export default Expense;
