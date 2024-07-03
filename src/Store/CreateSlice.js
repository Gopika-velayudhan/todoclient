import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks, createTask, updateTask, deleteTask } from "../Store/Api";

export const fetchAllTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await fetchTasks();
  return response.data;
});

export const addNewTask = createAsyncThunk("tasks/addNew", async (taskData) => {
  const response = await createTask(taskData);
  return response.data;
});

export const editTask = createAsyncThunk("tasks/edit", async ({ id, task }) => {
  const response = await updateTask(id, task);
  return response.data;
});

export const removeTask = createAsyncThunk("tasks/remove", async (id) => {
  const response = await deleteTask(id);
  return response.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        if (Array.isArray(state.tasks)) {
          state.tasks.push(action.payload);
        }
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
          
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload._id
        );
      });
  },
});

export default tasksSlice.reducer;
