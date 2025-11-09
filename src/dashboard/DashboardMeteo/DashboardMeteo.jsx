import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Mappa from "../../shared/components/Mappa";
import campiService from "../../shared/services/campi-service";
import meteoService from "../../shared/services/meteo-service";
import L from "leaflet";

// Icone mini per la colonna
const iconeMini = {
  temperatura: "🌡️",
  precipitazioni: "🌧️",
  umidità: "💧",
};

export default function DashboardMeteo() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRain, setShowRain] = useState(true);
  const [datoSelezionato, setDatoSelezionato] = useState("temperatura");

  useEffect(() => {
    const fetchMeteo = async () => {
      try {
        setLoading(true);
        const campi = await campiService.getAll();
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

        const results = await Promise.all(
          campi.map(async (campo) => {
            const lat = campo.coordinate?.lat;
            const lon = campo.coordinate?.lon;
            if (!lat || !lon) return null;

            const meteo = await meteoService.getMeteo(
              lat,
              lon,
              oneHourAgo.toISOString(),
              now.toISOString(),
              3600
            );

            const ultimo = meteo[meteo.length - 1];
            const isPioggia = ultimo.precipitazioni > 0.1;

            if (!showRain && isPioggia) return null;

            return {
              lat,
              lon,
              iconValue: ultimo[datoSelezionato],
              info: [
                { label: "Campo", text: campo.nome_campo || campo.nome },
                { label: "Temp.", text: `${ultimo.temperatura}°C` },
                { label: "Umidità", text: `${ultimo.umidità}%` },
                { label: "Pioggia", text: `${ultimo.precipitazioni} mm` },
              ],
              meta: {
                temperatura: ultimo.temperatura,
                precipitazioni: ultimo.precipitazioni,
                umidità: ultimo.umidità,
              },
            };
          })
        );

        setPoints(results.filter(Boolean));
      } catch (error) {
        console.error("Errore nel caricamento meteo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeteo();
  }, []);

  // Calcolo valori medi
  const media = points.length
    ? {
        temperatura: (
          points.reduce((sum, p) => sum + p.meta.temperatura, 0) / points.length
        ).toFixed(1),
        precipitazioni: (
          points.reduce((sum, p) => sum + p.meta.precipitazioni, 0) /
          points.length
        ).toFixed(1),
        umidità: (
          points.reduce((sum, p) => sum + p.meta.umidità, 0) / points.length
        ).toFixed(1),
      }
    : { temperatura: "-", precipitazioni: "-", umidità: "-" };

  // Funzione per creare divIcon con numero
  const creaIconaNumero = (valore) =>
    new L.DivIcon({
      className: "custom-div-icon",
      html: `<div style="
        background: rgba(255,255,255,0.9);
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #666;
        font-weight: bold;
        text-align: center;
        min-width: 30px;
      ">${valore}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

  return (
    <Paper
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        height: "80vh",
        overflow: "hidden",
      }}
    >
      {/* Colonna sinistra */}
      <Box
        sx={{
          width: 250,
          borderRight: "1px solid #ddd",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Impostazioni Meteo
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={showRain}
              onChange={(e) => setShowRain(e.target.checked)}
            />
          }
          label="Mostra pioggia"
        />

        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Dati medi campi
          </Typography>

          <ToggleButtonGroup
            value={datoSelezionato}
            exclusive
            onChange={(e, newValue) => {
              if (newValue) setDatoSelezionato(newValue);
            }}
            orientation="vertical"
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value="temperatura">
              {iconeMini.temperatura} Temperatura
            </ToggleButton>
            <ToggleButton value="precipitazioni">
              {iconeMini.precipitazioni} Precipitazioni
            </ToggleButton>
            <ToggleButton value="umidità">
              {iconeMini.umidità} Umidità
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ mt: 2 }}>
            <Typography>
              Media:{" "}
              {datoSelezionato === "temperatura"
                ? `${media.temperatura}°C`
                : datoSelezionato === "precipitazioni"
                ? `${media.precipitazioni} mm`
                : `${media.umidità}%`}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Mappa */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <Mappa
  points={points.map((p) => {
    if (datoSelezionato === "precipitazioni") {
      return {
        ...p,
        icon:
          p.meta.precipitazioni > 0.1
            ? "rain"  // goccia
            : "sun",  // sole se non piove
      };
    } else if (datoSelezionato === "temperatura") {
      return { ...p, icon: creaIconaNumero(p.meta.temperatura.toFixed(1)) };
    } else if (datoSelezionato === "umidità") {
      return { ...p, icon: creaIconaNumero(p.meta.umidità.toFixed(1)) };
    }
    return p;
  })}
  loading={loading}
/>
      </Box>
    </Paper>
  );
}
