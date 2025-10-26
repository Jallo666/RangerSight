import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function DockIcon({ icon: Icon, label, onClick, active = false }) {
  const theme = useTheme();

  return (
    <Tooltip title={label} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          transition: "all 0.25s ease-in-out",
          color: active ? theme.palette.primary.main : theme.palette.text.primary,
          backgroundColor: active ? theme.palette.action.hover : "transparent",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            transform: "scale(1.15)",
          },
        }}
      >
        <Icon fontSize="medium" />
      </IconButton>
    </Tooltip>
  );
}
