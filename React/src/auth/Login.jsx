import React, { useEffect, useState } from "react";
import logo from "../img/google.png";
import logo1 from "../img/apple.png";
import logo2 from "../img/custom-1.png";
import logo3 from "../img/auth-screens.png";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Deshboard from '../'

const Login = () => {


  const data ={
    email:"",
    password:"",
  }

const Navigate=useNavigate();
const dispatch =useDispatch();

const [login ,setLogin]=useState();







useEffect(()=>{
  axios
  .get(`http://localhost:3229/userget`)
  .then((res)=>{
    dispatch(setLogin(res.data));
  })
  .catch((error)=>{
    console.log("Error fetching data",error);

  })
  console.log('login :>> ', login);

},[]);







  
  return (
    <>
      <div className="w-full h-screen flex ">
        <div className="w-1/2 h-full  shadow-lg rounded-lg flex ">
          <div className="w-[50vh] h-full justify-center items-center  ml-52  mt-36 ">
            <div className="w-full  justify-center items-center flex flex-col">
              <label className="font-semibold text-2xl">Sign In</label>
              <label className="pt-4 text-gray-500 font-semibold">
                Your Social Campaigns
              </label>
            </div>
            <div className="flex pt-10  space-x-2 ">
              <div className="w-full h-10 border border-gray-400 rounded-lg items-center flex text-center space-x-6">
                <img src={logo} alt="google" className="w-6 h-6 ml-2"></img>
                <label className=" text-center  items-center ">
                  Sign in With Google
                </label>
              </div>
              <div className="w-full h-10 border border-gray-400 rounded-lg flex items-center space-x-6">
                <img src={logo1} alt="apple" className="w-6 h-6 ml-2"></img>
                <label className="text-center">Sign In With Apple</label>
              </div>
            </div>
            <div className="w-full justify-center items-center text-center mt-8 ">
              <label className="text-gray-500 ">Or with email</label>
            </div>
            <div className="w-full ">
              <div className="w-full flex flex-col">
                <label>Email</label>
                <input
                  type="text"
                  className="rounded-lg h-10 border border-gray-400"
                />
              </div>
              <div className="w-full flex flex-col mt-8">
                <label>Password</label>
                <input
                  type="text"
                  className="rounded-lg h-10 border border-gray-400"
                />
                <label className="text-end items-end mt-4">
                  Forgot Password ?
                </label>
              </div>
            </div>
            <div className="w-auto h-10 bg-blue-500 rounded-lg border border-gray-400 text-center mt-8 justify-center items-center flex">
              <button className=" text-xl  text-white justify-center items-center flex " onClick={()=>Navigate("/sidebar")}>Continues</button>
            </div>
            {/* <div className="w-full flex mt-6 text-center items-center">
              <label className="w-full text-center text-gray-600">
                Not a Member yet?{" "}
                <a href="./Signup" className="text-blue-600 font-semibold"> Sign up</a>
              </label>
            </div> */}
            <div className="justify-center mt-16 w-full flex text-blue-500">
              <a className="">Terms</a>
              <a className="mx-8">Plans</a>
              <a>Contact US</a>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full justify-center items-center flex flex-col bg-bg">
          <div className="flex justify-center items-center flex-col">
            <div className="flex  justify-center items-center mb-20">
              <img src={logo2} className="w-full h-20 "></img>
            </div>
            <div className="w-full h-full mb-24">
              <img src={logo3} alt="auth-screen" className="w-[500px] " />
            </div>
          </div>
          <div className="flex flex-col text-center w-1/2">
            <label className="text-white text-3xl font-bold">
              {" "}
              Fast, Efficient and Productive
            </label>
            <p className="text-white mt-4">
              In this kind of post, the bloggerintroduces a person they ve
              interviewed and provides some background information aboutthe
              intervieweeand their work following this is a transcript of the
              interview.
            </p>
          </div>
        </div>
      </div>

      







    </>
  );
};

export default Login;
