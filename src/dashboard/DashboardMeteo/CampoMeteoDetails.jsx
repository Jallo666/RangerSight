import React from "react";
import { Box, Typography, IconButton, Select, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LineChartMeteo from "../../shared/components/LineChartMeteo";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GrainIcon from "@mui/icons-material/Grain";
import InfoCard from "../../shared/components/InfoCard";

export default function CampoMeteoDetails({ campo, campi, points, onDeselect, onSelectCampo }) {
  if (!campo) return null;

  const puntiCampo = points.filter((p) => p.campo.id_campo === campo.id_campo);

  const datiGrafico = puntiCampo.map((p) => ({
    data: p.meta.data || new Date().toISOString(),
    temperatura: p.meta.temperatura,
    umidità: p.meta.umidità,
    precipitazioni: p.meta.precipitazioni,
  }));

  const infoCardProps = {
    temperatura: { icon: <DeviceThermostatIcon sx={{ fontSize: 40 }} />, label: "Temperatura", unit: "°C", bgcolor: "#FFF0E0", color: "#D97706" },
    umidità: { icon: <WaterDropIcon sx={{ fontSize: 40 }} />, label: "Umidità", unit: "%", bgcolor: "#E0F7FF", color: "#0288D1" },
    precipitazioni: { icon: <GrainIcon sx={{ fontSize: 40 }} />, label: "Pioggia", unit: "mm", bgcolor: "#E6F4EA", color: "#2E7D32" },
  };

  const formatDate = (d) => (d ? `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:00` : "-");

  const calcolaStatistiche = (campo) => {
    const valori = puntiCampo.map((p) => p.meta[campo] || 0);
    const media = valori.length ? (valori.reduce((sum, v) => sum + v, 0) / valori.length).toFixed(1) : 0;
    const min = valori.length ? Math.min(...valori) : 0;
    const max = valori.length ? Math.max(...valori) : 0;
    const minData = puntiCampo.find((p) => p.meta[campo] === min)?.meta.data || null;
    const maxData = puntiCampo.find((p) => p.meta[campo] === max)?.meta.data || null;
    return { media, min, max, minData, maxData };
  };

  const statistiche = {
    temperatura: calcolaStatistiche("temperatura"),
    umidità: calcolaStatistiche("umidità"),
    precipitazioni: calcolaStatistiche("precipitazioni"),
  };

  return (
    <Box sx={{ mb: 2, border: "1px solid #ddd", borderRadius: 2, p: 2, position: "relative" }}>
      <IconButton onClick={onDeselect} size="small" sx={{ position: "absolute", top: 4, right: 4 }}>
        <CloseIcon fontSize="small" />
      </IconButton>

      <Select
        value={campo.id_campo}
        onChange={(e) => {
          const selected = campi.find((c) => c.id_campo === e.target.value);
          if (selected) onSelectCampo(selected);
        }}
        sx={{ mb: 2, width: "calc(100% - 16px)" }}
      >
        {campi.map((c) => (
          <MenuItem key={c.id_campo} value={c.id_campo}>
            {c.nome_campo || c.nome}
          </MenuItem>
        ))}
      </Select>

      {datiGrafico.length > 0 && (
        <Box sx={{ mt: 2, height: 300 }}>
          <LineChartMeteo dati={datiGrafico} />
        </Box>
      )}

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Medie Meteo</Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {["temperatura", "umidità", "precipitazioni"].map((d) => (
          <InfoCard
            key={d}
            icon={infoCardProps[d].icon}
            label={infoCardProps[d].label}
            value={`${statistiche[d].media}${infoCardProps[d].unit}`}
            bgcolor={infoCardProps[d].bgcolor}
            color={infoCardProps[d].color}
          />
        ))}
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>Minimi e Massimi</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, maxHeight: 200, overflowY: "auto" }}>
        {["temperatura", "umidità", "precipitazioni"].map((d) => (
          <React.Fragment key={d}>
            <InfoCard
              icon={infoCardProps[d].icon}
              label={`Min ${infoCardProps[d].label}: ${statistiche[d].minData ? formatDate(statistiche[d].minData) : "-"}`}
              value={`${statistiche[d].min}${infoCardProps[d].unit}`}
              bgcolor="#FFE5D9"
              color="#BF360C"
            />
            <InfoCard
              icon={infoCardProps[d].icon}
              label={`Max ${infoCardProps[d].label}: ${statistiche[d].maxData ? formatDate(statistiche[d].maxData) : "-"}`}
              value={`${statistiche[d].max}${infoCardProps[d].unit}`}
              bgcolor="#C8E6C9"
              color="#1B5E20"
            />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
