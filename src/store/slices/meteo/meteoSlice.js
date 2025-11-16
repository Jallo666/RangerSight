import { createSlice } from '@reduxjs/toolkit';
import { setDataAction } from './meteoActions';

const initialState = {
  data:[2]
};

const meteoSlice = createSlice({
  name: "meteo",
  initialState,
  reducers: {
    setData: setDataAction,
  },
});

export const { setData } = meteoSlice.actions;
export default meteoSlice.reducer;