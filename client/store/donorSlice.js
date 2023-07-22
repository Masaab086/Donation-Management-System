import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  donors: [],
  search: "",
  page: 1,
  total: 1,
  pageCount: 1,
  status: STATUSES.IDLE,
};

// Fetch user thunk
export const fetchDonors = createAsyncThunk(
  "fetchDonors",
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const page = state.donor.page;
      const search = state.donor.search;
      const response = await axios.get(
        `http://localhost:8000/api/donor?page=${page}&search=${search}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Export createDonor

export const createDonor = createAsyncThunk(
  "createDonor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/donor",
        data
      );
      return response.data.data.donor;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
//  deleteDonor

export const deleteDonor = createAsyncThunk(
  "deleteDonor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/donor/${data}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update donor
export const updateDonor = createAsyncThunk(
  "updateDonor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/donor/${data.id}`,
        data.payload
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const usersSlice = createSlice({
  name: "donorSlice",

  initialState,

  extraReducers: {
    [fetchDonors.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [fetchDonors.fulfilled]: (state, action) => {
      state.donors = action.payload.data.donors;
      state.total = action.payload.data.total;
      state.pageCount = action.payload.data.pageCount;
      state.page = action.payload.data.currentPage;
      state.status = STATUSES.IDLE;
    },
    [fetchDonors.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
    [createDonor.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [createDonor.fulfilled]: (state, action) => {
      state.donors.push(action.payload);
      state.status = STATUSES.IDLE;
    },
    [fetchDonors.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
    [deleteDonor.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [deleteDonor.fulfilled]: (state, action) => {
      state.donors = state.donors.filter(
        (donor) => donor._id !== action.payload._id
      );
      state.status = STATUSES.IDLE;
    },
    [deleteDonor.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
    [updateDonor.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [updateDonor.fulfilled]: (state, action) => {
      const updatedDonor = action.payload;
      console.log("Updated donor");
      console.log(updatedDonor);

      state.donors = state.donors.map((donor) => {
        return updatedDonor._id === donor._id ? updatedDonor : donor;
      });
    },
    [updateDonor.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
  },

  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },

    searchDonor(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setStatus, searchDonor, changePage } = usersSlice.actions;

export default usersSlice.reducer;
