import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import adminUserReducer from './adminUserSlice';
import rootReducer from './adminUserSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    adminUser: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;