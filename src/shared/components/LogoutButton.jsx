import { Button, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/session/sessionSlice";
export default function LogoutButton({ children, onClick = ()=>{}, variant = "contained", minimized = false, ...props }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
      localStorage.removeItem("session");
      onClick();
        dispatch(logout());
    }
  
  if (minimized) {
    return <IconButton onClick={handleLogout} variant={variant} {...props} aria-label="logout" size="small">
      <LogoutIcon fontSize="inherit" />
    </IconButton>
  } else {
    return <Button onClick={handleLogout} endIcon={<LogoutIcon />} variant={variant} {...props}>{children}</Button >;
  }
}