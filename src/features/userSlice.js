import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.user = {};
      state.loggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
