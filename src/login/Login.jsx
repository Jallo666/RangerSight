import { Box } from "@mui/material";
import LoginCard from "./LoginCard";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import "./loginBackground.css";

export default function Login({ darkMode, setDarkMode }) {
  return (
    <Box
      className="login-background"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      color="text.primary"
    >
      <Box position="absolute" top={16} right={16} zIndex={2}>
        <ThemeToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
      </Box>

      <Box zIndex={2}>
        <LoginCard />
      </Box>

      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </Box>
  );
}
