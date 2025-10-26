import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Login from "./login/Login.jsx";
import { selectIsLogged } from "./store/slices/session/sessionSelectors";
import { login } from "./store/slices/session/sessionSlice";
import { lightTheme, darkTheme } from "./theme";
import { selectTheme } from "./store/slices/application/applicationSelectors";
import Application from "./application/Application.jsx";
export default function App() {
  const currentTheme = useSelector(selectTheme);
  const isLogged = useSelector(selectIsLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    const storage = localStorage.getItem("session");
    if (storage) {
      const sessionData = JSON.parse(storage);
      dispatch(login(sessionData.username, true));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {isLogged ? <Application /> : <Login />}
    </ThemeProvider>
  );
}
