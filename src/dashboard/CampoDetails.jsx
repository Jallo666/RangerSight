import React from "react";
import { Box, Typography } from "@mui/material";

export default function CampoDetails({ campo }) {
  if (!campo) {
    return (
      <Typography variant="h5" color="text.secondary">
        Seleziona un campo dal menu a sinistra
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {campo.nome_campo}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Tipo attività: {campo.tipo_attività}
      </Typography>

      <Typography variant="body1" component="div">
        <strong>Dimensione:</strong> {campo.dimensione_ha} ha
      </Typography>

      <Typography variant="body1" component="div">
        <strong>Tipo di suolo:</strong> {campo.tipo_suolo}
      </Typography>

      <Typography variant="body1" component="div">
        <strong>Coordinate:</strong>{" "}
        {campo.coordinate?.lat}, {campo.coordinate?.lon}
      </Typography>

      {campo.prodotti?.length > 0 && (
        <Typography variant="body1" sx={{ mt: 2 }} component="div">
          <strong>Prodotti:</strong> {campo.prodotti.join(", ")}
        </Typography>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Condizioni attuali
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          🌤 Temperatura: 23°C
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          💧 Umidità: 60%
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          ☔ Precipitazioni: 2 mm
        </Typography>
      </Box>
    </>
  );
}
