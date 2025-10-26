import React from "react";
import { Menu, MenuItem, Divider, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DockIcon from "./DockIcon";
import ThemeToggleButton from "../../theme/ThemeToggleButton";
import { useSelector, useDispatch } from "react-redux";
import { selectDockPosition } from "../../store/slices/application/applicationSelectors";
import { setDockPosition } from "../../store/slices/application/applicationSlice";
import { setTheme } from "../../store/slices/application/applicationSlice";
import { selectTheme } from "../../store/slices/application/applicationSelectors";
export default function DockSettings() {
  const dispatch = useDispatch();
  const currentDockPosition = useSelector(selectDockPosition);
  const currentTheme = useSelector(selectTheme);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {setAnchorEl(event.currentTarget)};
  const handleClose = () => setAnchorEl(null);

  const toggleDockPosition = () => {
    handleClose();
    dispatch(setDockPosition(currentDockPosition === "top" ? "bottom" : "top"));
  };


  const handleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <>
      <DockIcon
        icon={SettingsIcon}
        label="Impostazioni"
        onClick={handleClick}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleTheme}>
          <ThemeToggleButton />
          <Typography sx={{ ml: 1 }}>Tema</Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={toggleDockPosition}>
          Dock {currentDockPosition === "top" ? "in basso" : "in alto"}
        </MenuItem>
      </Menu>
    </>
  );
}
