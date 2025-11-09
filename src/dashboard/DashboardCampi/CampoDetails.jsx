import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CampoInfo from "./CampoInfo";
import Mappa from "../../shared/components/Mappa";
import CampoProdotti from "./CampoProdotti";
import CampoMeteo from "./CampoMeteo";
export default function CampoDetails({ campo }) {
  return (
    <Grid
      container
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 2,
      }}
    >
      <Paper sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CampoInfo campo={campo} />
      </Paper>

      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Mappa
          points={[
            {
              lat: campo.coordinate?.lat,
              lon: campo.coordinate?.lon,
              info: [
                { label: "Campo", text: campo.nome_campo || campo.nome },
                campo.dimensione_ha
                  ? { label: "Superficie", text: `${campo.dimensione_ha} ha` }
                  : null,
              ].filter(Boolean), // rimuove i null
            },
          ]}
        />      </Paper>
      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CampoProdotti prodotti={campo.prodotti} />
      </Paper>
      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CampoMeteo coordinate={campo.coordinate} />
      </Paper>
    </Grid>
  );
}
