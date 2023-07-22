import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks

// Create user thunk
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/user", data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Fetch user thunk
export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const page = state.user.page;
      const search = state.user.search;
      const response = await axios.get(
        `http://localhost:8000/api/user?$page=${page}&search=${search}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update user thunk
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/${data._id}`,
        data
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update user thunk
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/user/${data}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  users: [],
  search: "",
  page: 1,
  total: 1,
  pageCount: 1,
  status: STATUSES.IDLE,
};

const usersSlice = createSlice({
  name: "userSlice",

  initialState,
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [createUser.fulfilled]: (state, action) => {
      state.status = STATUSES.IDLE;
      state.users.push(action.payload.user);
    },
    [createUser.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
      console.log(action.payload);
    },
    [fetchUser.pending]: (state) => {
      if (state.search.length == 0) state.status = STATUSES.LOADING;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = STATUSES.IDLE;
      state.users = action.payload.users;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
    [updateUser.pending]: (state) => {
      state.status = STATUSES.LOADING;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = STATUSES.IDLE;
      const updatedUser = action.payload.user;
      console.log(updatedUser);

      state.users = state.users.filter((user) => {
        if (user._id !== updateUser._id) {
          return user;
        } else {
          console.log("Returning updatedUser");
          console.log(updatedUser);
          return updateUser;
        }
      });
    },
    [updateUser.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
    [deleteUser.pending]: (state) => {
      state.status = STATUSES.LOADING;
    },
    [deleteUser.fulfilled]: (state, action) => {
      const deletedUser = action.payload.user;
      state.users = state.users.filter((user) => user._id !== deletedUser._id);
      state.status = STATUSES.IDLE;
    },
    [deleteUser.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
  },

  reducers: {
    setStatus(state, action) {
      // This function is responsible for changin the status
      state.status = action.payload;
    },

    updateRows(state, action) {},
    searchUser(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setStatus, searchUser } = usersSlice.actions;

export default usersSlice.reducer;
