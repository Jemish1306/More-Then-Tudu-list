import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

import Login from './auth/Login'
import './App.css'
import Signup from './auth/Signup'
import Dashboard from './matirial ui/Deshbord'

import axios from 'axios'
import Heder from './componets/Heder'
import Stock from './componets/Stock'
import Machine from './componets/Machine'
import Comman from './componets/comman'

import Expense from './componets/Expense'
import MultipleMonthsDemo from './Helper/Datepiker'
import Sidebars from './componets/Sidebars'
import AdminUser from './componets/AdminUser'
import FilterData from './componets/FilterData'
import { Context } from './Context/Context'



const App = () => {
  
 

  return (
    <>
    <div>
      <BrowserRouter>
      <div className='flex'>
        <Sidebars classname="flex "/>
        <Context.Provider value={Context}>

        
        <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Signup' element={<Signup/>}/>
       
        <Route path='/AdminUser' element={<AdminUser/>}/>
        <Route path='/Heder' element={<Heder/>} />
        <Route path='/Stock' element={<Stock/>} />
        <Route path='/Machine' element={<Machine/>} />
        <Route path='/Expense' element={<Expense/>}> </Route>
        <Route path='/Filter' element={<FilterData/>}/> 
        <Route path='/Deshbord' element={<Dashboard/>} />
        <Route path='/Comman' element={<Comman/>}/>

      </Routes>
      </Context.Provider>
      </div>
    
     
      
      

   
     
     
      </BrowserRouter>

  
     

    




    </div>
    
    
    </>
  )
}

export default App