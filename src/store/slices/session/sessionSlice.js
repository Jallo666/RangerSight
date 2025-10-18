import { createSlice } from '@reduxjs/toolkit';
import { loginAction, logoutAction } from './sessionActions';

const initialState = {
  isLogged: false,
  stayLogged: false,
  username: "",
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: loginAction,
    logout: logoutAction,
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;