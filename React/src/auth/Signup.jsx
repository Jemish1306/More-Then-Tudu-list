import React from 'react'

import logo from '../img/google.png';
import logo1 from '../img/apple.png';
import logo2 from '../img/auth-screens.png';
import logo3 from '../img/custom-1.png'
import { useNavigate } from 'react-router-dom';








const Signup = () => {


    const neviget=useNavigate();
  return (
    <>
    <div className='w-screen h-full bg-white flex'>

        <div className='w-1/2 h-full justify-center items-center '>
            <div className='w-full h-full justify-center items-center'>
                <div className='  items-center justify-center flex flex-col pt-10'>
                    <label className='items-center justify-center font-semibold text-xl'>Sign Up</label>
                    <label className='text-gray-400 pt-2 font-semibold'>Your Social Campaigns</label>
                </div>
                <div className='w-full flex items-center justify-center space-x-4 pt-10'>
                    <div className='border h-10 flex rounded-lg items-center space-x-4 text-gray-600 font-medium'>
                        <img src={logo} alt='google' className='w-6 h-6 '/><label>Sign In With Google</label>

                    </div>
                    <div className='border h-10 flex rounded-lg items-center space-x-4 font-medium text-gray-600' >
                        <img src={logo1} alt='apple' className='w-6 h-6'/><label>Sign In With Apple</label>

                    </div>

                </div>
                <div className='w-full flex justify-center items-center pt-6'>
                    <label className='' >Or with email</label>

                </div>
                <div className='w-full flex flex-col justify-center items-center pt-6 '>
                    <label className='text-start w-[400px] font-semibold'>FristName</label>
                    <input type='text' className='border h-10 w-[400px] rounded-lg '  placeholder='  Frist Name '/>
                </div>
                <div className='w-full flex flex-col justify-center items-center pt-6'>
                    <label className='text-start w-[400px] font-semibold' >Lastname</label>
                    <input type='text' className='border h-10 w-[400px] rounded-lg ' placeholder='  Last Name'/>
                </div>
                <div className='w-full flex flex-col justify-center items-center pt-6'>
                    <label className='text-start w-[400px] font-semibold'>Email</label>
                    <input type='text' className='border h-10 w-[400px] rounded-lg' placeholder='  Email'/>

                </div>
                <div className='w-full flex flex-col justify-center items-center pt-6'>
                    <label className='text-start w-[400px] font-semibold'>Password</label>
                    <input type='text' className='border h-10 w-[400px] rounded-lg' placeholder='  Password'/>
                </div>

             <div className='w-full flex justify-center items-center space-x-6 pt-4'>
                <span className='w-20 h-2 rounded-lg flex bg-slate-200 items-center'></span>
                <span className='w-20 h-2 rounded-lg flex bg-slate-200 items-center'></span>
                <span className='w-20 h-2 rounded-lg flex bg-slate-200 items-center'></span>
                <span className='w-20 h-2 rounded-lg flex bg-slate-200 items-center'></span>
             </div>

             <div className='w-full flex justify-center items-center pt-5 text-sm'>
                <label>Use 8 or more characters with a mix of letters, numbers & symbols.</label>
             </div>

             <div className='w-full flex flex-col justify-center items-center pt-6'>
                <label className='text-start w-[400px] font-semibold'>Confirm Password</label>
                <input type='text' className='w-[400px]  border h-10 rounded-lg' placeholder='  Confirm Password'/> 

             </div>
             <div className='w-full flex  justify-center items-center  pt-6 space-x-4'>
                <input type='checkbox' className=' items-start  text-start flex'/>
                <labal>I Accept the <span className='text-blue-500'>Terms.</span></labal>

             </div>
             <div className='w-full flex justify-center items-center pt-4'>
                <button className='w-[400px] bg-bg rounded-lg h-10 justify-center items-center text-white' onClick={() => neviget('/Sidebar')}>Submit</button>
             </div>

             <div className='w-full flex justify-center items-center pt-4'>
                <button className='w-[400px] bg-blue-100 hover:bg-bg rounded-lg h-10 justify-center items-center text-white'>Cancel</button>
             </div>

             <div className="justify-center mt-16 w-full flex text-blue-500">
              <a  className="">Terms</a>
              <a className="mx-8">Plans</a>
              <a>Contact US</a>
            </div>


            </div>
















        </div>
        <div className='w-1/2 h-auto  bg-bg'>
            <div className='w-full h-full justify-center items-center flex flex-col' >
                <div className='w-full items-center flex justify-center pt-12'>
                    <img src={logo3} alt=''/>
                </div>
                <div>
                    <img  src={logo2} className=''/>
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




    </div>
    </>
  )
}

export default Signup