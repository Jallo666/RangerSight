import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/session/sessionSlice";
import applicationReducer from "./slices/application/applicationSlice";
import meteoReducer from "./slices/meteo/meteoSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    application: applicationReducer,
    meteo: meteoReducer,
  },
});