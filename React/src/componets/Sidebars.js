import React, { useEffect, useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import loop from "../img/Loopbots Logo 001 - Copy.png";
import { NavLink } from "react-router-dom";

const Sidebars = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
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

  return (
    <>
      <div className="w-[300px] h-screen flex  ">
        <div className="w-auto h-full bg-slate-900 flex flex-col text-gray-400 font-sans ">
          <div className="w-full  py-6 text-white">
            <img src={loop} alt="loopbots"></img>
          </div>
          {/* <NavLink to="Deshboard">
            <div className="w-full flex justify-start  items-center pt-6 text-start space-x-4  hover:text-white">
              <span className="icon-dashboard pl-8  text-base hover:text-white  ">
                {" "}
              </span>
              <label className="text-gray-400 hover:text-white text-start">
                Deshboard
              </label>
            </div>
          </NavLink> */}
          <NavLink to="AdminUser">
          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white">
            <span className="icon-user hover:text-white pl-8  text-base">
              {" "}
            </span>
            <label
              className="text-gray-400 hover:text-white"
              
            >
              Admin User
            </label>
          </div>
          </NavLink>
          <NavLink to="Stock">
          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white ">
            <span class="icon-clipboard-edit hover:text-white pl-8  text-base"></span>
            <label
              className="text-gray-400 hover:text-white"
              
            >
              Stock
            </label>
          </div>
          </NavLink>
          <NavLink to="Machine">
          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white ">
            <span class="icon-load-balancer hover:text-white pl-8  text-base"></span>
            <label
              className="text-gray-400 hover:text-white"
              
            >
              Machine
            </label>
          </div>
          </NavLink>
          <NavLink to="Expense">
          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white ">
            <span class="icon-indent-decrease hover:text-white pl-8  text-base"></span>
            <label
              className="text-gray-400 hover:text-white"
              
            >
              Expense
            </label>
          </div>
          </NavLink>
          <NavLink to="Filter">
          <div className="w-full flex justify-start  items-center  pt-6 text-start space-x-4 hover:text-white">
            <span class="icon-folder-outline-add hover:text-white pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white text-start">
            Expense  Data
            </label>
          </div>
          </NavLink>

          {/* <NavLink to="Customer">
          <div className="w-full flex justify-start items-center  pt-6 text-start space-x-4 hover:text-white">
            <span class="icon-star hover:text-white pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">Festivals</label>
          </div>
          </NavLink>
          <NavLink to="Reward">
          <div className="w-full flex justify-start items-center  pt-6  space-x-4 hover:text-white">
            <span class="icon-inbox hover:text-white pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">Quotes</label>
          </div>
          </NavLink>
          <NavLink to="Coupons">
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-folder-outline-add hover:text-white pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">
              Customer Subscriptions
            </label>
          </div>
          </NavLink>
          <NavLink to="Brand">
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-note-add hover:text-white  pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">
              Reward Transaction
            </label>
          </div>
          </NavLink>
          <NavLink to="CMS">
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-document-text hover:text-white  pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">Coupons</label>
          </div>
          </NavLink>
          <NavLink to="Setting">
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-file-eps hover:text-white  pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">
              Brand Edit Request (0)
            </label>
          </div>
          </NavLink>
          <NavLink>
          <div className="w-full flex justify-start items-center  pt-6 space-x-4 hover:text-white">
            <span class="icon-envelope hover:text-white  pl-8  text-base"></span>
            <label className="text-gray-400 hover:text-white">CMS Pages</label>
          </div>
          </NavLink>
          <NavLink>
          <div className="w-full flex justify-start  items-center  pt-6 hover:text-white space-x-4">
            <span class="icon-cog pl-8   text-base"></span>
            <label className="text-gray-400 hover:text-white ">Setting</label>
          </div>
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default Sidebars;
