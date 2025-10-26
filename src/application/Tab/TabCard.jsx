import React from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";

export default function TabCard({ titles = [], sx }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const visibleTitles = isMobile ? titles.slice(0, 1) : titles.slice(0, 2);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        gap: 2,
        ...sx,
      }}
    >
      {visibleTitles.map((title, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            textAlign="center"
          >
            HAI APERTO UNA SCHEDA: {title}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
