
import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAdminUser = createAsyncThunk('adminUser/fetchAdminUser', async () => {
  try {
    const response = await axios.get('http://localhost:3229/expenseget');
    return response.data;
  } catch (error) {
    throw error;
  }
});