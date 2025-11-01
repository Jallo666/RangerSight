export const setThemeAction = (state, action) => {
  state.theme = action.payload;
};

export const setDockPositionAction = (state, action) => {
  state.dock.position = action.payload;
};

export const setEmptyNavigationAction = (state) => {
  state.navigation = [];
};

export const addNavigationItemAction = (state, action) => {
  const newItem = action.payload;
  const exists = state.navigation.includes(newItem);

  if (!exists) {
    state.navigation.push(newItem);
  }
};

export const setNavigationItemAction = (state, action) => {
  const item = action.payload;
  state.navigation = [item];
};

export const removeNavigationItemAction = (state, action) => {
  const itemToRemove = action.payload;
  const index = state.navigation.indexOf(itemToRemove);

  if (index !== -1) {
    state.navigation.splice(index, 1);
  }
};

export const setDeviceTypeAction = (state, action) => {
  state.deviceType = action.payload;
};