import { createSlice } from '@reduxjs/toolkit';
import { setThemeAction } from './applicationActions';

const initialState = {
  theme: "light",
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setTheme: setThemeAction
  },
});

export const { setTheme } = applicationSlice.actions;
export default applicationSlice.reducer;