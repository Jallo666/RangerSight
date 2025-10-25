import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Login from "./login/Login.jsx";
import LogoutButton from "./shared/components/LogoutButton.jsx";
import { selectIsLogged } from "./store/slices/session/sessionSelectors";
import { login } from "./store/slices/session/sessionSlice";
import { lightTheme, darkTheme } from "./theme";
import ThemeToggleButton from "./shared/components/ThemeToggleButton";
import { selectTheme } from "./store/slices/application/applicationSelectors";
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
        {isLogged ? (
          <div style={{ display: "flex", gap: 10 }}>
            <ThemeToggleButton />
            <LogoutButton>LogOut</LogoutButton>
            <LogoutButton minimized />
          </div>
        ) : (
          <Login />
        )}
    </ThemeProvider>
  );
}
