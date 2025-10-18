import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/session/sessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});