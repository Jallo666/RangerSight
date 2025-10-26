import React from "react";
import { Box, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import DashboardIcon from "@mui/icons-material/Dashboard";
import logo from "../../assets/logo.svg";
import DockIcon from "./DockIcon";
import DockSettings from "./DockSettings";
import DockAccount from "./DockAccount";
import { useSelector } from "react-redux";
import { selectDockPosition } from "../../store/slices/application/applicationSelectors";

export default function Dock() {
  const currentDockPosition = useSelector(selectDockPosition);

  return (
    <Paper
      sx={{
        position: "fixed",
        [currentDockPosition]: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        p: 1.5,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 3,
        mx: "auto",
        maxWidth: 800,
        zIndex: 10,
      }}
    >
      <Box display="flex" gap={1}>
        <DockIcon icon={HomeIcon} label="Home" />
        <DockIcon icon={MapIcon} label="Mappa" />
        <DockIcon icon={DashboardIcon} label="Dashboard" />
      </Box>

      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="Logo" style={{ height: 40, objectFit: "contain" }} />
      </Box>

      <Box display="flex" gap={1} alignItems="center">
        <DockSettings />
        <DockAccount />
      </Box>
    </Paper>
  );
}
