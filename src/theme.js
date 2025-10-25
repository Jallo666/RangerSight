import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#b35c1e" },
    secondary: { main: "#d98c4a" },
    background: { default: "#f5f2ec", paper: "#ffffff" },
    text: { primary: "#3b2f2a", secondary: "#6b4f3c" },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4a2f1a" },
    secondary: { main: "#8c5a2d" },
    background: { default: "#12110d", paper: "#1e1b16" },
    text: { primary: "#e0c9b0", secondary: "#c49b78" },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});
