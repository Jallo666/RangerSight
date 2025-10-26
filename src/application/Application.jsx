import React from "react";
import { Box } from "@mui/material";
import Dock from "./Dock/Dock.jsx";
import TabCard from "./Tab/TabCard.jsx";

export default function Application() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flex: 1, display: "flex", p: 2 }}>
        <TabCard titles={["Scheda 1"]} />
      </Box>

      <Dock />
    </Box>
  );
}
