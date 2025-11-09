import React from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";
import { TipiAttivitaColori } from "../../shared/model/model";
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

<Typography component="div">
  <strong>Tipo attività:</strong>{" "}
  <Chip
    label={campo.tipo_attività}
    size="small"
    sx={{
      bgcolor:
        TipiAttivitaColori[campo.tipo_attività]?.bgColor || "primary.light",
      color:
        TipiAttivitaColori[campo.tipo_attività]?.textColor ||
        "primary.contrastText",
      fontWeight: 500,
    }}
  />
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
