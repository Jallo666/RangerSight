import React from "react";
import {
  Menu,
  MenuItem,
  Divider,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutButton from "../../shared/components/LogoutButton";
import DockIcon from "./DockIcon";
import { useSelector } from "react-redux";
import { selectUsername } from "../../store/slices/session/sessionSelectors";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/session/sessionSlice";
export default function DockAccount() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const username = useSelector(selectUsername);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("session");
    dispatch(logout());
    handleClose();
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <DockIcon
        icon={AccountCircleIcon}
        label="Profilo"
        onClick={handleClick}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          disableRipple
          sx={{
            cursor: "default",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography fontWeight={600}>{username}</Typography>
            <Typography variant="body2" color="text.secondary">
              Profilo personale
            </Typography>
          </Box>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <LogoutButton minimized={true}>Logout</LogoutButton>
          <Typography sx={{ ml: 1 }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
