export const loginAction = (state, action) => {
  state.isLogged = true;
  state.username = action.payload.username || "";
  state.stayLogged = action.payload.stayLogged || false;
};

export const logoutAction = (state) => {
  state.isLogged = false;
  state.username = "";
  state.stayLogged = false;
};
