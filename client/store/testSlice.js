import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "test",
  total: 20,
};

const testSlice = createSlice({
  name: "testSlice",
  initialState,
  reducers: {
    add(state, action) {
      state.name = action.payload;
      alert(state.name);
    },
  },
});

export const { add } = testSlice.actions;
export default testSlice.reducer;
