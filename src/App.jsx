import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import Login from "./login/Login.jsx";
import { selectIsLogged } from "./store/slices/session/sessionSelectors";
import { login } from "./store/slices/session/sessionSlice";
import { lightTheme, darkTheme } from "./theme";
import { selectTheme } from "./store/slices/application/applicationSelectors";
import { setDeviceType } from "./store/slices/application/applicationSlice";
import Application from "./application/Application.jsx";

export default function App() {
  const currentTheme = useSelector(selectTheme);
  const isLogged = useSelector(selectIsLogged);
  
  const dispatch = useDispatch();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isMobile) dispatch(setDeviceType("mobile"));
    else if (isTablet) dispatch(setDeviceType("tablet"));
    else if (isDesktop) dispatch(setDeviceType("desktop"));
  }, [isMobile, isTablet, isDesktop, dispatch]);

  useEffect(() => {
    const storage = localStorage.getItem("session");
    if (storage) {
      const sessionData = JSON.parse(storage);
      dispatch(login(sessionData.username, true));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {isLogged ? <Application /> : <Login />}
    </ThemeProvider>
  );
}
