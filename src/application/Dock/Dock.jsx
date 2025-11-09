import React from "react";
import { Box, Paper } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GridView from "@mui/icons-material/GridView";
import logo from "../../assets/logo.svg";
import DockIcon from "./DockIcon";
import DockSettings from "./DockSettings";
import DockAccount from "./DockAccount";
import { useSelector } from "react-redux";
import { selectDockPosition } from "../../store/slices/application/applicationSelectors";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
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
        <DockIcon navigation={true} icon={GridView} label="Campi" />
        <DockIcon navigation={true} icon={StorefrontIcon} label="Prodotti" />
        <DockIcon navigation={true} icon={AssignmentIcon} label="Attività" />
        <DockIcon navigation={true} icon={ThunderstormIcon} label="Meteo" />
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
