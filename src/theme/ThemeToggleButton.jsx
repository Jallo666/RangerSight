import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme } from "../store/slices/application/applicationSelectors";
import { setTheme } from "../store/slices/application/applicationSlice";

export default function ThemeToggleButton({ ...props }) {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <IconButton
      onClick={handleToggle}
      color="inherit"
      {...props}
      sx={{
        transition: "transform 0.3s ease, color 0.3s ease",
        transform: currentTheme === "light" ? "rotate(0deg)" : "rotate(180deg)",
      }}
    >
      {currentTheme === "light" ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}
