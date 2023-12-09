import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create } from "@mui/material/styles/createTransitions";

import { fetchAdminUser } from "./middlewear";

const adminUserSlice = createSlice({
    name: 'adminUser',
    initialState: {
      adminuser1: [],
      stockuser: [],
      machineuser: [],
      expenseuser: [],
      
      status: 'idle',
      error: null,
      dates:  [],
    },
    reducers: {
      // your other synchronous reducers here
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAdminUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAdminUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.adminuser1 = action.payload;
        })
        .addCase(fetchAdminUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });









const userSlice = createSlice({
  name: "sidebar",
  initialState: { adminuser1: [] },
  reducers: {
    addUser: (state, action) => {
      state.adminuser1.push(action.payload);
    },
   

    editUser: (state, action) => {
      const { id, data } = action.payload || {}; // Check if action.payload is defined
      const existingUser = state.adminuser1.find((user) => user.id === id);

      if (existingUser) {
        existingUser.name = data.name;
        existingUser.photo = data.photo;
        existingUser.email = data.email;
        existingUser.mobile = data.mobile;
        existingUser.password = data.password;
        // Add other properties if needed
      }
    },

    deleteUser: (state, action) => {
      const userId = action.payload;
      state.adminuser1 = state.adminuser1.filter((user) => user.id !== userId);
    },
  },
});

const stockSlice = createSlice({
  name: "stock",
  initialState: { stockuser: [] },
  reducers: {
    addstock: (state, action) => {
      state.stockuser.push(action.payload);
    },
    editstock: (state, action) => {
      const { id, data } = action.payload;

      const stockindex = state.stockuser.find((user) => user.id === id);    

      if (stockindex) {
        stockindex.item = data.item;
        stockindex.price = data.price;
        stockindex.remark = data.remark;
        stockindex.quantity = data.quantity;
      }

      // if (stockindex !== -1) {
      //     state.stockuser[stockindex]=data;
      // }
    },
    deletestock: (state, action) => {
      const id = action.payload;
      state.stockuser = state.stockuser.filter((user) => user.id !== id);
    },
  },
});

const machineSlice = createSlice({
  name: "machine",
  initialState: { machineuser: [] },
  reducers: {
    addmachine: (state, action) => {
      state.machineuser.push(action.payload);
    },
    editmachine: (state, action) => {
      const { id, data } = action.payload;
      const machineindex = state.machineuser.find((user) => user.id === id);

      if (machineindex) {
        machineindex.name = data.name;
        machineindex.number = data.number;
        machineindex.remark = data.remark;
      }

      // if (machineindex !== -1) {
      //     state.machineuser[machineindex]=data
      // }
    },
    deletemachine: (state, action) => {
      const id = action.payload;
      state.machineuser = state.machineuser.filter((user) => user.id !== id);
    },
  },
});

const expenseSlice = createSlice({

    
  name: "expense",
  initialState: { expenseuser: [] },
  reducers: {
    addexpense: (state, action) => {
      state.expenseuser.push(action.payload);
    },

    editexpense: (state, action) => {
      const { id, data } = action.payload;
      const expenseindex = state.expenseuser.find((user) => user.id === id);

      if (expenseindex) {
        expenseindex.machine = data.machine;
        expenseindex.stock = data.stock;
        expenseindex.quantity = data.quantity;
        expenseindex.amount = data.amount;
        // expenseindex.debit=data.debit;
      }
    },
    deleteexpense: (state, action) => {
      const id = action.payload;
      state.expenseuser = state.expenseuser.filter((user) => user.id !== id);
    },
  },
  

  
});



  
 


const rootReducer = combineReducers({
  sidebar: userSlice.reducer,
  stock: stockSlice.reducer,
  machine: machineSlice.reducer,
  expense: expenseSlice.reducer,
  adminUser:adminUserSlice.reducer,
  
});

export default rootReducer;

export const { addUser, editUser, deleteUser } = userSlice.actions;
export const { addstock, editstock, deletestock } = stockSlice.actions;
export const { addmachine, editmachine, deletemachine } = machineSlice.actions;
export const { addexpense, editexpense, deleteexpense } = expenseSlice.actions;
export const {extraReducers}=adminUserSlice.actions;
// export const { fetchAdminUsers } = adminUserSlice.actions;

// export default adminUserSlice.reducer;
