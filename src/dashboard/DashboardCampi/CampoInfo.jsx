import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function CampoInfo({ campo }) {
  if (!campo) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
        Nessun campo selezionato.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="h5" gutterBottom>
        {campo.nome_campo}
      </Typography>
      <Divider sx={{ mb: 1 }} />

      <Typography>
        <strong>Tipo attività:</strong> {campo.tipo_attività}
      </Typography>

      <Typography>
        <strong>Dimensione:</strong> {campo.dimensione_ha} ha
      </Typography>

      <Typography>
        <strong>Tipo di suolo:</strong> {campo.tipo_suolo}
      </Typography>

      <Typography>
        <strong>Coordinate:</strong>{" "}
        {campo.coordinate.lat}, {campo.coordinate.lon}
      </Typography>

      {campo.prodotti?.length > 0 && (
        <Typography>
          <strong>Prodotti associati:</strong> {campo.prodotti.join(", ")}
        </Typography>
      )}
    </Box>
  );
}
