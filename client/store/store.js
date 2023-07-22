import { configureStore } from "@reduxjs/toolkit";

import testReducer from "./testSlice";
import userReducer from "./userSlice";
import donorReducer from "./donorSlice";
import donationReducre from "./donationSlice";
import authReducer from "./authSlice";
import expanseReducer from "./expanseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer,
    user: userReducer,
    donor: donorReducer,
    donation: donationReducre,
    expanse: expanseReducer,
  },
});

export default store;
