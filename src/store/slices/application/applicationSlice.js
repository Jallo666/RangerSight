import { createSlice } from '@reduxjs/toolkit';
import { setThemeAction } from './applicationActions';
import { setDockPositionAction } from './applicationActions';
const initialState = {
  theme: "light",
  dock: {
    position: "top",
  },
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setTheme: setThemeAction,
    setDockPosition: setDockPositionAction,
  },
});

export const { setTheme, setDockPosition } = applicationSlice.actions;
export default applicationSlice.reducer;