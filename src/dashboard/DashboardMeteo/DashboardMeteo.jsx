import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material";
import Mappa from "../../shared/components/Mappa";
import campiService from "../../shared/services/campi-service";
import meteoService from "../../shared/services/meteo-service";
import L from "leaflet";
import TimeRangePicker from "./TimeRangePicker";
import CampoMeteoDetails from "./CampoMeteoDetails";

export default function DashboardMeteo() {
  const [points, setPoints] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [datoSelezionato, setDatoSelezionato] = useState("temperatura");
  const [campiList, setCampiList] = useState([]);

  const [campoSelezionato, setCampoSelezionato] = useState(null);
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const [timeRange, setTimeRange] = useState({ start: oneHourAgo, end: now });
  const [ultimoDato, setUltimoDato] = useState(null);

  const fetchMeteo = async (start, end) => {
    try {
      setLoading(true);
      const campi = await campiService.getAll();
      setCampiList(campi);
      const tuttiPunti = await Promise.all(
        campi.map(async (campo) => {
          const lat = campo.coordinate?.lat;
          const lon = campo.coordinate?.lon;
          if (!lat || !lon) return null;

          const meteo = await meteoService.getMeteo(
            campo,
            start.toISOString(),
            end.toISOString(),
            3600
          );

          if (!meteo || meteo.length === 0) return null;

          const puntiCampo = meteo.map((m) => ({
            lat,
            lon,
            meta: {
              temperatura: m.temperatura,
              umidità: m.umidità,
              precipitazioni: m.precipitazioni,
              data: new Date(m.data || m.timestamp),
            },
            campo,
          }));

          const ultimo = puntiCampo[puntiCampo.length - 1];

          return { puntiCampo, ultimo, campo };
        })
      );

      const validi = tuttiPunti.filter(Boolean);

      setPoints(validi.flatMap((v) => v.puntiCampo));

      const lastPoints = validi.map((v) => ({
        ...v.ultimo,
        iconValue: v.ultimo.meta[datoSelezionato],
        info: [
          { label: "Campo", text: v.campo.nome_campo || v.campo.nome },
          { label: "Temp.", text: `${v.ultimo.meta.temperatura}°C` },
          { label: "Umidità", text: `${v.ultimo.meta.umidità}%` },
          { label: "Pioggia", text: `${v.ultimo.meta.precipitazioni} mm` },
        ],
        actions: [
          {
            label: "Seleziona Campo",
            callback: () => setCampoSelezionato(v.campo),
          },
        ],
        campo: v.campo,
      }));
      setMapPoints(lastPoints);

      setUltimoDato(lastPoints[0]?.meta.data || null);
    } catch (error) {
      console.error("Errore nel caricamento meteo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!timeRange.start || !timeRange.end) return;

    fetchMeteo(timeRange.start, timeRange.end);
  }, [timeRange, datoSelezionato]);

  const creaIconaNumero = (valore, isSelected = false) =>
    new L.DivIcon({
      className: "custom-div-icon",
      html: `<div style="
        background: rgba(255,255,255,0.9);
        padding: 4px 8px;
        border-radius: 4px;
        border: ${isSelected ? "2px solid #1976d2" : "1px solid #666"};
        font-weight: bold;
        text-align: center;
        min-width: 30px;
        box-shadow: ${isSelected ? "0 0 6px rgba(25, 118, 210, 0.6)" : "none"};
      ">${valore}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

  const formatDataOverlay = (d) => {
    if (!d) return "";
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    const dateStr = d.toLocaleDateString("it-IT", options);
    const hourStr = d.getHours().toString().padStart(2, "0") + ":00";
    return `Dati del ${dateStr} Ore ${hourStr}`;
  };

  return (
    <Box sx={{ display: "flex", height: "80vh", overflow: "hidden", position: "relative" }}>
      <Box sx={{ width: 500, borderRight: "1px solid #ddd", p: 2, display: "flex", flexDirection: "column" }}>
        <TimeRangePicker
          onSubmit={({ start, end }) => setTimeRange({ start, end })}
          initialRange={timeRange}
        />

        {campoSelezionato ? (
          <CampoMeteoDetails
            campo={campoSelezionato}
            campi={campiList}
            
            onSelectCampo={setCampoSelezionato}
            points={points}
            onDeselect={() => setCampoSelezionato(null)}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Seleziona un campo sulla mappa per vedere i dettagli
          </Typography>
        )}
      </Box>

      <Box sx={{ flex: 1, position: "relative" }}>
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {formatDataOverlay(ultimoDato)}
          </Typography>

          <ToggleButtonGroup
            value={datoSelezionato}
            exclusive
            onChange={(e, newValue) => newValue && setDatoSelezionato(newValue)}
            size="small"
          >
            <ToggleButton value="temperatura">Temperatura</ToggleButton>
            <ToggleButton value="precipitazioni">Pioggia</ToggleButton>
            <ToggleButton value="umidità">Umidità</ToggleButton>
          </ToggleButtonGroup>
        </Paper>

        <Mappa
          points={mapPoints.map((p) => ({
            ...p,
            icon: creaIconaNumero(
              datoSelezionato === "temperatura"
                ? p.meta.temperatura.toFixed(1)
                : datoSelezionato === "precipitazioni"
                  ? p.meta.precipitazioni.toFixed(1)
                  : p.meta.umidità.toFixed(1),
              campoSelezionato?.id_campo === p.campo.id_campo  // qui usi id_campo
            ),
          }))}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
