import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../Store/CreateSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

export default store;
