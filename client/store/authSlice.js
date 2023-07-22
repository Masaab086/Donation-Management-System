const { createSlice } = require("@reduxjs/toolkit");

const initialState = { user: null, jwt: null, isAuthenticated: false };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, jwt, isAuthenticated } = action.payload;
      state.user = user;
      state.jwt = jwt;
      state.isAuthenticated = true;
    },

    logOut: (state, action) => {
      state.user = null;
      state.jwt = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
