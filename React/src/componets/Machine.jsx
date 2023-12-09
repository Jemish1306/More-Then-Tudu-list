import React, { useEffect, useState } from "react";
import loop from "../img/Loopbots Logo 001 - Copy.png";
import { RiAdminLine } from "react-icons/ri";

// import edit2 from "../img/edit2"
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import search from "../img/search.png";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../asset/css/icomoon.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  addmachine,
  deletemachine,
  editmachine,
} from "../Redux/adminUserSlice";

import Swal from "sweetalert2";
import { fetchAdminUser } from "../Redux/middlewear";


const Machine = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const Swal = require("sweetalert2");
  const machineUsers = useSelector((state) => state.adminUser.machineuser);
  const status = useSelector((state) => state.adminUser.status);
  
  const data = {
    id: Math.floor(Math.random() * 100000),
    name: "",
    number: "",
    remark: "",
  };

  const [showForm, setShowForm] = useState(false);
  const [inputdata, setInputdata] = useState(data);
  const [adminuser, setAdminuser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showmachine, setShowmachine] = useState();
  const [selectedValue, setSelectedValue] = React.useState("a");
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
  };
  const hendaldata = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };

  // const hendalsubmit = (index) => {
  //   if (isEditing) {
  //     // If isEditing is true, it's an edit operation
  //     const updatedAdminUser = [...adminuser];
  //     const indexToEdit = adminuser.findIndex(
  //       (user) => user.id === inputdata.id
  //     );
  //     updatedAdminUser[indexToEdit] = inputdata;
  //     setAdminuser(updatedAdminUser);
  //   } else {
  //     // It's an add operation
  //     const updatedAdminUser = [...adminuser];
  //     updatedAdminUser.push(inputdata);
  //     setAdminuser(updatedAdminUser);
  //   }
  //   setInputdata(data); // Clear input fields
  //   setShowForm(!showForm);
  //   setIsEditing(data); // Clear edit state

  //   axios
  //     .get("https://65003ffa18c34dee0cd496d7.mockapi.io/mock")
  //     .then((res) => {
  //       console.log("res", res);
  //     });

  //   axios.post("http://localhost:3229/item", inputdata).then((respost) => {
  //     console.log("respost", respost);
  //   });
  // };


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAdminUser());
    }
  }, [dispatch, status]);



  const hendalsubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editmachine({ id: inputdata.id, data: inputdata }));
      const updateadminUser = adminuser.map(
        (user) => (user.id === inputdata.id ? inputdata : user),

        axios
          .put(`http://localhost:3229/editmachine/${inputdata.id}`, inputdata)
          .then((res) => {
            console.log("update react edit machine", res.data);
          })
          .catch((error) => {
            console.log("update react machine error", error);
          })
      );
      setAdminuser(updateadminUser);
    } else {
      dispatch(addmachine(inputdata));
      const updateadminUser = [...adminuser, inputdata];
      setAdminuser(updateadminUser);

      axios
        .post("http://localhost:3229/machine", inputdata)
        .then((res) => {
          console.log("data machine api", res.data);
        })
        .catch((error) => {
          console.log("error on frient", error);
        });
    }
    setInputdata(data);
    setShowForm(false);
    setIsEditing(false);
  };

  const hendaleditform = (userId) => {
    // dispatch(editmachine({id:userId.id,data:inputdata}));
    // const updatedmachine = adminuser.filter((user)=> user.id ===userId);

    // setAdminuser(updatedmachine);

    setShowForm(true);
    setIsEditing(true);
    setInputdata(userId);
  };

  const handleDelete = (userId) => {

    // dispatch(deletemachine(userId));

    const updatedAdminUser = adminuser.filter((user) => user.id !== userId);
    setAdminuser(updatedAdminUser);

    axios
      .delete(`http://localhost:3229/deletemachine/${userId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("deleteerror", error);
      });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get("http://localhost:3229/machineget")
      .then((res) => {
        dispatch(setAdminuser(res.data));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [dispatch]);

  // const filteredAdminUsers = adminuser.filter((user) => {
  //   const userValues = Object.values(user);
  //   const query = searchQuery.toLowerCase();

  //   // Check if any user data field contains the search query
  //   return userValues.some((value) =>
  //     value.toString().toLowerCase().includes(query)
  //   );
  // });

  const filteredAdminUsers = adminuser
    .map((user, index) => ({
      id: user.id,
      name: user.name,
      number: user.number,
      remark: user.remark,
    }))
    .filter((user) => {
      const userValues = Object.values(user);
      const query = searchQuery.toLowerCase();

      return userValues.some(
        (value) =>
          value !== undefined && value.toString().toLowerCase().includes(query)
      );
    });

  const handelmachine = () => {
    setShowmachine(!showmachine);
  };

  const handleoff = () => {
    setShowForm(false);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value); //redio button
  };

  // useEffect(()=>{
  //   setAdminuser(machineUsers)
  // },[machineUsers])
  // useEffect(() => {
  //   if (machineUsers) {
  //     setAdminuser(machineUsers);
  //   }
  // }, [machineUsers]);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Name", width: 193 },
    { field: "number", headerName: "Number", width: 201 },
    { field: "remark", headerName: "Remark", width: 201 },

    {
      field: "action",
      headerName: "Action",

      width: 162,
      renderCell: (params) => (
        <div className="w-full h-full flex   items-center  space-x-4 ">
          <span className="bg-gray-200 w-7 h-7 rounded-md justify-center items-center flex ">
            <span
              className="icon-pencil w-4 h-4 flex text-gray-500 rounded-md hover:text-blue-500 items-center justify-center"
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

                setTimeout(() => {
                  Swal.close();
                  
                }, 1500);
              


                Swal.fire({
                  icon: "error",
                  title: "Delete successfully...",
                  text: "Delete successfully",
                  // footer: '<a href="#">Why do I have this issue?</a>'
                  
                  
                });
                


                handleDelete(params.row.id);
              }}
            ></span>
          </span>
        </div>
      ),
    },
  ];

  const rows = {};

  return (
    <>
      <div className="w-screen h-screen flex ">
        {/* <div className="w-1/6 h-full bg-slate-900 flex flex-col text-gray-400 font-sans ">
          <div className="w-full  py-6 text-white">
            <img src={loop} alt="loopbots"></img>
          </div>
          <div className="w-full flex justify-start  items-center pt-6 text-start space-x-4  hover:text-white">
            <span className="icon-dashboard pl-8  text-base hover:text-white  ">
              {" "}
            </span>
            <label
              className="text-gray-400 hover:text-white text-start"
              onClick={() => Navigate("/Deshbord")}
            >
              Deshboard
            </label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white">
            <span className="icon-user hover:text-white pl-8  text-base">
              {" "}
            </span>
            <label
              className="text-gray-400 hover:text-white"
              onClick={() => Navigate("/Sidebar")}
            >
              Admin User
            </label>
          </div>

          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white">
            <span class="icon-clipboard-edit hover:text-white pl-8  text-base"></span>
            <label
              className="text-gray-400 hover:text-white"
              onClick={() => Navigate("/Stock")}
            >
              Stock
            </label>
          </div>

          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white ">
            <span class="icon-load-balancer hover:text-white pl-8  text-base"></span>
            <label
              className="text-gray-400 hover:text-white"
              onClick={() => Navigate("/Machine")}
            >
              Machine
            </label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white ">
            <span class="icon-indent-decrease hover:text-white pl-8  text-base"></span>
            <label
              className="text-gray-400 hover:text-white"
              onClick={() => Navigate("/Expense")}
            >
              Expense
            </label>
          </div>

          <div className="w-full flex justify-start  items-center  pt-6 text-start space-x-4 hover:text-white">
            <span class="icon-folder-outline-add hover:text-white pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white text-start">
              Subscription Packages
            </label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white">
            <span class="icon-star hover:text-white pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">Festivals</label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6  space-x-4 hover:text-white">
            <span class="icon-inbox hover:text-white pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">Quotes</label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-folder-outline-add hover:text-white pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">
              Customer Subscriptions
            </label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-note-add hover:text-white  pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">
              Reward Transaction
            </label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-document-text hover:text-white  pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">Coupons</label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-file-eps hover:text-white  pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">
              Brand Edit Request (0)
            </label>
          </div>
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-envelope hover:text-white  pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">CMS Pages</label>
          </div>
          <div className="w-full flex justify-start  items-center  pt-6 hover:text-white space-x-4">
            <span class="icon-cog pl-8   text-base"></span>
            <label className="text-gray-400 hover:text-white ">Setting</label>
          </div>
        </div> */}
        <div className=" h-full w-full items-center  flex flex-col">
          <div className="  w-full flex bg-white shadow-lg  text-end   justify-end items-center p-6">
            {/* <span className="icon-user"></span> */}
            <label className="font-bold pr-4 text-xl">Hi .administer</label>
            <RiAdminLine className="w-7 h-7 border rounded-lg bg-gray-200" />
          </div>
          <hr />
          <div className="w-full  flex   p-4 justify-between">
            <div className="flex flex-col">
              <label className="text-xl font-semibold">Machine list</label>
              <labal className="text-xs text-gray-400">
                User Mangement{" "}
                <span className="text-gray-900 font-medium"> - Machine list</span>
              </labal>
            </div>
            <div className="text-end text-lg font-semibold text-gray-600 justify-center pt-2">
              Today: {formattedDateTime}
            </div>
          </div>

          <div className="w-full justify-center items-center bg-white border shadow-lg mt-2 p-10 ">
            <div className="w-full  flex justify-end">
              <div className="flex w-full h-full justify-end sm:justify-center md:justify-center  lg:justify-end  md:ml-[50vh]">
                <button
                  type="button"
                  className="flex items-center justify-center border hover:text-sky-500 border-sky-500 border-dashed bg-white hover:bg-sky-100 rounded-md px-2.5 py-1 h-10 w-full sm:w-32 md:w-44 lg:w-44"
                  onClick={handleAdddata}
                >
                  <span className="items-center icon-add_circle_outline  text-sky-500 flex justify-center font-medium  rounded-full text-lg w-[20px] text-blue h-[20px]"></span>
                  <span className=" ml-1.5 text-sm flex text-sky-600 ">
                    Add Machine
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

            <div className="p-4 w-full text-center">
              <DataGrid
                className="w-auto h-full flex text-center justify-center "
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
                <div className=" w-full h-[550px] border flex flex-wrap bg-white flex-col  shadow-lg rounded-lg  p-6 ">
                  <div className="flex pb-4 border-b justify-between  ">
                    <label className="text-lg font-semibold ">
                      Add Machine{" "}
                    </label>
                    <span
                      class="icon-cancel-circle text-red-500 w-6"
                      onClick={handleoff}
                    ></span>
                  </div>
                  <div className=" flex-col flex  justify-center items-center  text-start pb-4 pt-4">
                    <label className="font-medium text-sm w-96 flex text-start pb-1">
                      Name
                    </label>
                    <input
                      type="text "
                      name="name"
                      value={inputdata.name}
                      className="border rounded-lg  w-96 h-10 font-normal text-sm pl-2 "
                      onChange={hendaldata}
                    />
                  </div>

                  <div className="flex-col flex  justify-center items-center  text-start pb-4 pt-2">
                    <label className="font-medium text-sm  w-96 pb-1">
                      Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={inputdata.number}
                      className="border rounded-lg  w-96 h-10 font-normal text-sm pl-2"
                      onChange={hendaldata}
                    />
                  </div>
                  <div className="flex-col flex  justify-center items-center  text-start pt-2 ">
                    <label className="font-medium text-sm  w-96 pb-1">
                      Remark
                    </label>
                    <input
                      type="text "
                      name="remark"
                      value={inputdata.remark}
                      className="border rounded-lg  w-96 h-10 font-normal text-sm pl-2"
                      onChange={hendaldata}
                    />
                  </div>

                  <div className=" flex flex-col pt-4 pl-2">
                    <label className="font-medium text-sm   ">Status</label>
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

                  <div className="w-full mt-8  border-t flex justify-end pt-6">
                    <div className="pt-4 pr-4">
                      <button
                        className=" border border-dashed border-green-500 rounded-md text-green-500 w-24 h-8 hover:bg-green-100 text-sm "
                        onClick={hendalsubmit}
                      >
                        <span className="icon-check1 pr-2"></span>
                        Save
                      </button>
                    </div>
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
      <span className="icon-flag text-red h-8 w-8"></span>
    </>
  );
};

export default Machine;
