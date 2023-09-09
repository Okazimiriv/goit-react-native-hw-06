import { createSlice, nanoid } from '@reduxjs/toolkit';

const authInitialState = {
  email: "",
  password: "" 
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    createUser(state, { payload }) {      
      state.email = payload.email;
      state.password = payload.password;
    },
    logIn(state, { payload }) {
      state = payload;
    },
    logOut(state) {
      state = { email: "", password: "" };
    },
  },
});

export const { createUser, logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;