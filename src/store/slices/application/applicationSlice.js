import { createSlice } from '@reduxjs/toolkit';
import { setThemeAction } from './applicationActions';
import {
  setDockPositionAction, setEmptyNavigationAction, addNavigationItemAction, removeNavigationItemAction, setDeviceTypeAction, setNavigationItemAction
} from './applicationActions';

const initialState = {
  theme: "light",
  dock: {
    position: "top",
  },
  navigation: ["Campi"],
  deviceType: "desktop",
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setTheme: setThemeAction,
    setDockPosition: setDockPositionAction,
    cancelNavigation: setEmptyNavigationAction,
    addNavigationItem: addNavigationItemAction,
    setNavigationItem: setNavigationItemAction,
    removeNavigationItem: removeNavigationItemAction,
    setDeviceType: setDeviceTypeAction,
  },
});

export const { setTheme, setDockPosition, cancelNavigation, addNavigationItem, removeNavigationItem, setDeviceType, setNavigationItem } = applicationSlice.actions;
export default applicationSlice.reducer;