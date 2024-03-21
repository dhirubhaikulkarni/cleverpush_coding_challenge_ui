// store.js
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskmanagementSlice'; // Adjust the path

const store = configureStore({
  reducer: {
    task: taskReducer
    // Add other reducers if you have them
  },
});

export default store;
