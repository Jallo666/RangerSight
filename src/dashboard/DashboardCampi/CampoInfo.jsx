import React from "react";
import { Box, Typography, Divider, Grid, Paper } from "@mui/material";
import { LocationOn, Height, Grass, Nature, Timer } from "@mui/icons-material";
import { TipiAttivitaColori } from "../../shared/model/model";
import InfoCard from "../../shared/components/InfoCard";

export default function CampoInfo({ campo }) {
  if (!campo) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
        Nessun campo selezionato.
      </Typography>
    );
  }

  const allCards = [
    {
      icon: <Grass />,
      label: "Dimensione",
      value: `${campo.dimensione_ha} ha`,
      bgcolor: "success.light",
      color: "success.contrastText",
    },
    {
      icon: <Nature />,
      label: "Tipo di suolo",
      value: campo.tipo_suolo,
      bgcolor: "info.light",
      color: "info.contrastText",
    },
    {
      icon: <Height />,
      label: "Altitudine",
      value: `${campo.altitudine} m`,
      bgcolor: "warning.light",
      color: "warning.contrastText",
    },
    {
      icon: <LocationOn />,
      label: "Coordinate",
      value: `${campo.coordinate.lat}, ${campo.coordinate.lon}`,
      bgcolor: "primary.light",
      color: "primary.contrastText",
    },
    campo.prodotti?.length > 0
      ? {
          icon: <Timer />,
          label: "Prodotti associati",
          value: campo.prodotti.join(", "),
          bgcolor: "secondary.light",
          color: "secondary.contrastText",
        }
      : null,
    {
      icon: <Timer />,
      label: "Tipo attività",
      value: campo.tipo_attività,
      bgcolor: TipiAttivitaColori[campo.tipo_attività]?.bgColor || "primary.light",
      color: TipiAttivitaColori[campo.tipo_attività]?.textColor || "primary.contrastText",
    },
  ].filter(Boolean);

  const firstRow = allCards.slice(0, 3);
  const secondRow = allCards.slice(3, 6);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {campo.nome_campo}
      </Typography>
      <Divider sx={{ mb: 1 }} />

      <Grid container spacing={2} justifyContent="center">
        {firstRow.map((card, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <InfoCard
              icon={card.icon}
              label={card.label}
              value={card.value}
              bgcolor={card.bgcolor}
              color={card.color}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        {secondRow.map((card, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <InfoCard
              icon={card.icon}
              label={card.label}
              value={card.value}
              bgcolor={card.bgcolor}
              color={card.color}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
