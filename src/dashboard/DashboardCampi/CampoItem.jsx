import React from "react";
import {
  Box,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

export default function CampoItem({
  campo,
  selectedCampo,
  setSelectedCampo,
  isLast,
}) {
  const isSelected = selectedCampo?.id_campo === campo.id_campo;

  return (
    <>
      <ListItem
        onClick={() => setSelectedCampo(campo)}
        selected={isSelected}
        sx={{
          py: 2,
          px: 2,
          alignItems: "flex-start",
          cursor: "pointer",
          borderLeft: "4px solid",
          borderLeftColor: isSelected ? "primary.main" : "transparent",
          transition: "border-color 0.2s ease, background-color 0.2s ease",
          "&.Mui-selected": {
            bgcolor: "action.selected",
          },
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <ListItemText
          primaryTypographyProps={{ component: "div" }}
          secondaryTypographyProps={{ component: "div" }}
          primary={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {campo.nome_campo}
              </Typography>
              <Chip
                label={campo.tipo_attività}
                size="small"
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  fontWeight: 500,
                }}
              />
            </Box>
          }
          secondary={
            <Box mt={0.5}>
              <Typography variant="body2" color="text.secondary">
                <strong>Stadio:</strong> Crescita iniziale
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Stato:</strong>{" "}
                <Box
                  component="span"
                  sx={{
                    color: "success.main",
                    fontWeight: "bold",
                  }}
                >
                  OK
                </Box>
              </Typography>
              {campo.prodotti?.length > 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  Codici prodotto: {campo.prodotti.join(", ")}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                <strong>Condizioni:</strong> 🌤 23°C · 💧 60% · ☔ 2 mm
              </Typography>
            </Box>
          }
        />
      </ListItem>

      {!isLast && <Divider />}
    </>
  );
}
