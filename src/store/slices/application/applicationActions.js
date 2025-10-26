export const setThemeAction = (state, action) => {
      state.theme = action.payload;
};

export const setDockPositionAction = (state, action) => {
      state.dock.position = action.payload;
};