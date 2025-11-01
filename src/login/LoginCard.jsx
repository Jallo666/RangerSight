import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/session/sessionSlice";
import { authenticate } from "./services/authService";

import {
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Switch,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@mui/material";
import logo from "../assets/logo.svg";

export default function LoginCard() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stayLogged, setStayLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      const loginResponse = await authenticate(username, password);
      dispatch(login({
        username: loginResponse.username,
        stayLogged: stayLogged
      }));
      if (stayLogged) {
        localStorage.setItem(
          "session",
          JSON.stringify({
            token: loginResponse.token,
            username: loginResponse.username,
          })
        );
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, width: { xs: "100%", sm: 400 } }}>
      <Box display="flex" justifyContent="center" mb={3}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "100%", maxWidth: 180, height: "auto", objectFit: "contain" }}
        />
      </Box>

      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Login
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} mb={2}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1, userSelect: "none" }}>
            Rimani connesso
          </Typography>
          <Switch
            checked={stayLogged}
            onChange={(e) => setStayLogged(e.target.checked)}
            color="primary"
            size="small"
          />
        </Box>

        <Button 
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          loading={loading}
          sx={{ mt: 2 }}
        >
          Login
        </Button >
      </form>
    </Paper>

  );
}
