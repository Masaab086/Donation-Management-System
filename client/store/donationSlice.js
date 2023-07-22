import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../server";

const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  donations: [],
  search: "",
  dateFilter: "",
  typeFilter: "",
  page: 1,
  total: 1,
  pageCount: 1,
  status: STATUSES.IDLE,
};

// Fetch Donation thunk
export const fetchDonations = createAsyncThunk(
  "fetchDonations",
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const page = state.donation.page;
      const search = state.donation.search;
      const dateFilter = state.donation.dateFilter;
      const typeFilter = state.donation.typeFilter;
      const response = await axios.get(
        `${server}/api/donation?page=${page}&search=${search}&dateFilter=${dateFilter}&type=${typeFilter}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Export createDonation

export const createDonation = createAsyncThunk(
  "createDonation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}/api/donation`, data);
      return response.data.data.donor;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
//  Deelte donation

export const deleteDonor = createAsyncThunk(
  "deleteDonation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/donation/${data}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update Donation
export const updateDonation = createAsyncThunk(
  "updateDonation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/donation/${data.id}`,
        data.payload
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const donationSlice = createSlice({
  name: "donationSlice",

  initialState,

  extraReducers: {
    [fetchDonations.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [fetchDonations.fulfilled]: (state, action) => {
      console.log("Executing Donations fetching");
      state.donations = action.payload.data.donations;
      state.total = action.payload.data.total;
      state.pageCount = action.payload.data.pageCount;
      state.page = action.payload.data.currentPage;
      state.status = STATUSES.IDLE;
      console.log(state.donations);
    },
    [fetchDonations.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
    [createDonation.pending]: (state, action) => {
      state.status = STATUSES.LOADING;
    },
    [createDonation.fulfilled]: (state, action) => {
      console.log("Executing Donations fetching");
      state.donations = action.payload.data.donations;
      state.total = action.payload.data.total;
      state.pageCount = action.payload.data.pageCount;
      state.page = action.payload.data.currentPage;
      state.status = STATUSES.IDLE;
      console.log(state.donations);
    },
    [createDonation.rejected]: (state, action) => {
      state.status = STATUSES.ERROR;
    },
  },

  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },

    searchDonation(state, action) {
      state.search = action.payload;
    },

    setFilter(state, action) {
      console.log(`Value of action ${action.payload}`);
      state.dateFilter = action.payload;
      console.log("Value inside the setFilter " + state.dateFilter);
    },
    setTypeFilter(state, action) {
      state.typeFilter = action.payload;
    },
  },
});

export const {
  setStatus,
  searchDonation,
  changePage,
  setFilter,
  setTypeFilter,
} = donationSlice.actions;

export default donationSlice.reducer;
