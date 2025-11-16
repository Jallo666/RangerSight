import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  useTheme,
  Button
} from "@mui/material";
import LineChartMeteo from "../../shared/components/LineChartMeteo";
import InfoCard from "../../shared/components/InfoCard";
import meteoService from "../../shared/services/meteo-service";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GrainIcon from "@mui/icons-material/Grain";

export default function CampoMeteo({ coordinate, campoId }) {
  const theme = useTheme();
  const [dati, setDati] = useState(null);
  const [loading, setLoading] = useState(true);
  const oggi = new Date().toLocaleDateString("it-IT", { weekday: "short" });
  const [giornoSelezionato, setGiornoSelezionato] = useState(oggi);
  useEffect(() => {
    const fetchMeteo = async () => {
      try {
        setLoading(true);

        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 7 * 24 * 3600 * 1000);

        const data = await meteoService.getMeteo(
          campoId,
          startTime,
          endTime,
          3600
        );

const storico = data.map(d => ({
  data: d.data,
  giorno: new Date(d.data).toLocaleDateString("it-IT", { weekday: "short" }),
  temperatura: d.temperatura,
  umidità: d.umidità,
  precipitazioni: d.precipitazioni,
}));

        setDati({
          storico,
          attuale: data[data.length - 1],
        });

      } catch (error) {
        console.error("Errore nel caricamento dati meteo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (coordinate) fetchMeteo();
  }, [coordinate]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!dati) {
    return (
      <Typography color="text.secondary" sx={{ p: 2 }}>
        Nessun dato meteo disponibile.
      </Typography>
    );
  }

  const { storico, attuale } = dati;
  const giorni = [...new Set(storico.map(d => d.giorno))];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        p: 2,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Meteo del Campo
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ flex: 1, minHeight: 220 }}>
        <LineChartMeteo
          dati={
            giornoSelezionato
              ? storico.filter(d => d.giorno === giornoSelezionato)
              : storico
          }
        />
      </Box>


      {/* Bottoni selezione giorno */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1 }}>
        {giorni.map((g) => (
          <Button
            key={g}
            variant={giornoSelezionato === g ? "contained" : "outlined"}
            color={giornoSelezionato === g ? "primary" : "inherit"}
            onClick={() => setGiornoSelezionato(g)}
          >
            {g}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 3,
          flexWrap: "nowrap",
          width: "100%",
        }}
      >
        <InfoCard
          icon={<DeviceThermostatIcon sx={{ fontSize: 40 }} />}
          label="Temperatura"
          value={`${attuale.temperatura}°C`}
          bgcolor={theme.palette.warning.light}
          color={theme.palette.warning.contrastText}
        />
        <InfoCard
          icon={<WaterDropIcon sx={{ fontSize: 40 }} />}
          label="Umidità"
          value={`${attuale.umidità}%`}
          bgcolor={theme.palette.info.light}
          color={theme.palette.info.contrastText}
        />
        <InfoCard
          icon={<GrainIcon sx={{ fontSize: 40 }} />}
          label="Pioggia"
          value={`${attuale.precipitazioni} mm`}
          bgcolor={theme.palette.success.light}
          color={theme.palette.success.contrastText}
        />
      </Box>
    </Box>
  );
}
