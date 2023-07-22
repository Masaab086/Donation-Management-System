import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../server";

const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  expanses: [],
  search: "",
  dateFilter: "",
  typeFilter: "",
  page: 1,
  total: 1,
  pageCount: 1,
  status: STATUSES.IDLE,
};

// Fetch Donation thunk
export const fetchExpanses = createAsyncThunk(
  "fetchexpanses",
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const page = state.expanse.page;
      const search = state.expanse.search;
      const dateFilter = state.expanse.dateFilter;
      const typeFilter = state.expanse.typeFilter;
      const response = await axios.get(
        `${server}/api/expanse?page=${page}&search=${search}&dateFilter=${dateFilter}&type=${typeFilter}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Export createDonation

export const createExpanse = createAsyncThunk(
  "createExpanse",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}/api/expanse`, data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
//  Deelte donation

export const deleteExpanse = createAsyncThunk(
  "deleteExpanse",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/expanse/${data}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update Donation
export const updateExpanse = createAsyncThunk(
  "updateExpanse",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/expanse/${data.id}`,
        data.payload
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const expanseSlice = createSlice({
  name: "expanseSlice",

  initialState,

  extraReducers: {
    [fetchExpanses.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [fetchExpanses.fulfilled]: (state, action) => {
      console.log("Executing Expanse fetching");
      state.expanses = action.payload.data.expanses;
      state.total = action.payload.data.total;
      state.pageCount = action.payload.data.pageCount;
      state.page = action.payload.data.currentPage;
      state.status = STATUSES.IDLE;
      console.log(state.expanses);
    },
    [fetchExpanses.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
    [createExpanse.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [createExpanse.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.expanses.push(action.payload);
    },
    [createExpanse.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
  },

  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },

    setFilter(state, action) {
      console.log(`Value of action ${action.payload}`);
      state.dateFilter = action.payload;
      console.log("Value inside the setFilter " + state.dateFilter);
    },
    setTypeFilter(state, action) {
      console.log("Setting state value " + action.payload);
      state.typeFilter = action.payload;
      console.log("Change state value " + state.typeFilter);
    },
  },
});

export const { setStatus, changePage, setFilter, setTypeFilter } =
  expanseSlice.actions;

export default expanseSlice.reducer;
