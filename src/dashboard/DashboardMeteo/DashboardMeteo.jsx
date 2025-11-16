import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Mappa from "../../shared/components/Mappa";
import campiService from "../../shared/services/campi-service";
import meteoService from "../../shared/services/meteo-service";
import L from "leaflet";

const iconeMini = {
  temperatura: "🌡️",
  precipitazioni: "🌧️",
  umidità: "💧",
};

export default function DashboardMeteo() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
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
              campo.id_campo,
              oneHourAgo.toISOString(),
              now.toISOString(),
              3600
            );

            const ultimo = meteo[meteo.length - 1];

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
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        overflow: "hidden",
      }}
    >
      {/* Colonna sinistra */}
      <Box
        sx={{
          width: 500,
          borderRight: "1px solid #ddd",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Impostazioni Meteo
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
      </Box>

      {/* Mappa */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <Mappa
          points={points.map((p) => ({
            ...p,
            icon: creaIconaNumero(
              datoSelezionato === "temperatura"
                ? p.meta.temperatura.toFixed(1)
                : datoSelezionato === "precipitazioni"
                  ? p.meta.precipitazioni.toFixed(1)
                  : p.meta.umidità.toFixed(1)
            ),
          }))}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
