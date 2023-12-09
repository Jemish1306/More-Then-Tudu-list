import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Context } from '../Context/Context';
import { DataGrid } from '@mui/x-data-grid';
import { RiAdminLine } from 'react-icons/ri';
import search from "../img/search.png";
import { Dropdown } from 'primereact/dropdown';
import { useDispatch } from 'react-redux';

const FilterData = () => {


  const dispatch = useDispatch();
  const data = {
    id: Math.floor(Math.random() * 100000),
    date: new Date().toISOString(),
    machine: "",
    stock: "",
    quantity: "",
    amount: "",
  };

  const [dateRange,setDateRange] =useState([]);

  const [adminUser,setAdminUser]=useState();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  const [machineData,setMachineData]=useState();

  const [selectedMachine,setSelectedMachine]=useState();

  const [inputData,setInputData]=useState();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  
  
  const formattedDateTime = currentDateTime.toLocaleString("en", options);
  const currentDate = formattedDateTime;

  // const {setAdminuser}=useContext(Context)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
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


 
  
    const filteredAdminUsers =
      adminUser && adminUser.length > 0
        ? adminUser.map((user, index) => ({
            id: user.id,
            machine: user.machine,
            stock: user.stock,
            quantity: user.quantity,
            amount: user.amount,
            // ... other properties
          })).filter((user) => {
            const userValues = Object.values(user);
            const query = searchQuery.toLowerCase();
  
            return userValues.some(
              (value) =>
                value !== undefined && value.toString().toLowerCase().includes(query)
            );
          })
        : [];

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "machine", headerName: "Machine", width: 150 },

    { field: "stock", headerName: "Stock", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
  ]

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


// const handleFilter = ()=>{

 



//   if (dateRange && dateRange.length===2) {
//     const startDate=dateRange[0];
//     const endDate = dateRange[1];

//     axios
//     .get(`http://localhost:3229/expenseget?startDate=${startDate}&endDate=${endDate}`)

//     .then((res)=>{

//       const filteredAdminUsers = res.data.filter((user)=>{
//         const userData = new Date(user.date);
//         return userData>= startDate && userData<= endDate;
//       });
//       setAdminUser(filteredAdminUsers)

//     })
//     .catch((error)=>{
//       console.log('error :>> ', error);
//     })
//   }
// }

const handleFilter = () => {
  if (dateRange && dateRange.length === 2) {
    const startDate = dateRange[0];
    const endDate = dateRange[1];

    let apiUrl = `http://localhost:3229/expenseget?startDate=${startDate}&endDate=${endDate}`;

    // Include machine filter if a machine is selected
    if (selectedMachine) {
      apiUrl += `&machine=${selectedMachine.name}`;
    }

    axios
    .get(apiUrl)
    .then((res) => {
      const filteredAdminUsers = res.data.filter((user) => {
        const userData = new Date(user.date);
        const isWithinDateRange = userData >= startDate && userData <= endDate;
        
        // Check if the machine name matches the selected machine
        const isMatchingMachine = !selectedMachine || user.machine === selectedMachine.name;
  
        return isWithinDateRange && isMatchingMachine;
      });
  
      setAdminUser(filteredAdminUsers);
    })
    .catch((error) => {
      console.log('error :>> ', error);
    });
  }
};

const handleDateRangeOff =({setAdminuser})=>{
  setDateRange([]);
  axios
  .get(`http://localhost:3229/expenseget`)
  .then((res)=>{
    setAdminUser(res.data.data);
  })
  .catch((error)=>{
console.log('error :>> ', error);
  })
}


  return (
    <>
    <div className=' w-screen h-screen flex'>

<div className=" h-full w-full items-center  flex flex-col">
          <div className="  w-full flex bg-white shadow-lg  text-end   justify-end items-center p-6">
            {/* <span className="icon-user"></span> */}
            <label className="font-bold pr-4 text-xl">Hi .administer</label>
            <RiAdminLine className="w-7 h-7 border rounded-lg bg-gray-200" />
          </div>
          <hr />
          <div className="w-full  flex   p-4 justify-between">
            <div className="flex flex-col">
              <label className="text-xl font-semibold">Manager list</label>
              <labal className="text-xs text-gray-400">
                User Mangement{" "}
                <span className="text-gray-900 font-medium">
                  {" "}
                  - Manager list
                </span>
              </labal>
            </div>
            <multipleMonthDemo />
            <div className="text-end text-lg font-semibold text-gray-600 justify-center pt-2 ">
              Today: {formattedDateTime}
            </div>
          </div>

          <div className="w-full  justify-center items-center bg-white border shadow-lg mt-2 p-10 ">
            <div className="w-full flex justify-start items-end">
              <div className=" w-auto card flex  flex-col items-center justify-start ">
                <label className="w-full text-start font-medium text-sm">
                  DateRange
                </label>
                {/* <Calendar
                  value={startDate}
                //  onSelect={()=>handleFilter()}
                  onChange={(e) => setStartDate(e.value)}
                  numberOfMonths={2}
                  className="border rounded-lg w-32 pl-2 h-10"
                /> */}

                <div className="card flex justify-content-center ">
                  <Calendar
                    value={dateRange}
                    onChange={(e) => setDateRange(e.value)}
                    selectionMode="range"
                    readOnlyInput
                    className="border rounded-lg w-58 pl-2 h-10"
                    numberOfMonths={2}
                  >
                    {" "}
                  </Calendar>
                </div>
              </div>
              <div className='flex ml-8 items-center flex-col'>
                <labal className="w-full text-start font-normal text-sm">Select a Machine</labal>
              <Dropdown
                          value={selectedMachine}
                          onChange={(e) => {
                            setSelectedMachine(e.value);
                            setInputData({
                              ...inputData,
                              machine: e.value.name,
                            });
                          }}
                          options={machineData}
                          optionLabel="machine"
                          placeholder="Selected a Machine"
                          filter
                          valueTemplate={selectedMachineTemplate}
                          itemTemplate={MachineOptionTemplate}
                          className="w-full md:w-14rem border rounded-lg h-10 items-center"
                        />
              </div>
            
              <div className="items-end flex justify-center ml-8 ">
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
    
    </div>
    </div>
    </>
  )
}

export default FilterData
