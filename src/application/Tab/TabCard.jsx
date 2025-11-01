import React from "react";
import { Box, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardCampi from "../../dashboard/DashboardCampi";
import { useSelector, useDispatch } from "react-redux";
import { selectNavigation } from "../../store/slices/application/applicationSelectors";
import { removeNavigationItem } from "../../store/slices/application/applicationSlice";

export default function TabCard() {
  const navigation = useSelector(selectNavigation);
  const dispatch = useDispatch();

  const handleClose = (title) => {
    dispatch(removeNavigationItem(title));
  };

  const currentTab = navigation[0];

  if (!currentTab) return null;

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        gap: 2,
        overflowX: "visible",
        minHeight: 0,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          minWidth: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          bgcolor: "background.paper",
          borderRadius: 2,
          minHeight: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            p: 2,
          }}
        >
          <IconButton
            size="small"
            onClick={() => handleClose(currentTab)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
              "&:hover": { color: "error.main", bgcolor: "action.hover" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Box sx={{ mb: 2, fontWeight: "bold", fontSize: 18, flexShrink: 0 }}>
            {currentTab}
          </Box>

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {currentTab === "Campi" ? <DashboardCampi /> : <Box>{currentTab}</Box>}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
