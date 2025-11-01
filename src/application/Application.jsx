import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Dock from "./Dock/Dock.jsx";
import TabCard from "./Tab/TabCard.jsx";
import {
  selectDeviceType,
  selectDockPosition,
} from "../store/slices/application/applicationSelectors.js";

export default function Application() {
  const deviceType = useSelector(selectDeviceType);
  const currentDockPosition = useSelector(selectDockPosition);

  let paddingValue =
    deviceType === "mobile" ? 0 :
    deviceType === "tablet" ? 4 :
    9;

  const dockHeight = 64;

  const paddingStyles =
    deviceType === "mobile"
      ? currentDockPosition === "bottom"
        ? { pb: `${dockHeight}px` }
        : currentDockPosition === "top"
        ? { pt: `${dockHeight}px` }
        : {}
      : {};

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          p: paddingValue,
          ...paddingStyles,
        }}
      >
        <TabCard />
      </Box>
      <Dock />
    </Box>
  );
}
