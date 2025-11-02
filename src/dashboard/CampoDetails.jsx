import React from "react";
import { Box, Typography, Paper, Grid, useTheme } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function CampoDetails({ campo }) {
  const theme = useTheme();

  if (!campo) {
    return (
      <Typography variant="h5" color="text.secondary">
        Seleziona un campo dal menu a sinistra
      </Typography>
    );
  }

  const produzioneData = [
    { mese: "Gen", valore: 20 },
    { mese: "Feb", valore: 35 },
    { mese: "Mar", valore: 50 },
    { mese: "Apr", valore: 45 },
    { mese: "Mag", valore: 70 },
    { mese: "Giu", valore: 60 },
    { mese: "Lug", valore: 80 },
    { mese: "Ago", valore: 75 },
    { mese: "Set", valore: 60 },
    { mese: "Ott", valore: 55 },
    { mese: "Nov", valore: 40 },
    { mese: "Dic", valore: 30 },
  ];

  const meteoData = [
    { giorno: "Lun", umidità: 55 },
    { giorno: "Mar", umidità: 60 },
    { giorno: "Mer", umidità: 62 },
    { giorno: "Gio", umidità: 58 },
    { giorno: "Ven", umidità: 61 },
    { giorno: "Sab", umidità: 64 },
    { giorno: "Dom", umidità: 63 },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {campo.nome_campo}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Tipo attività: {campo.tipo_attività}
          </Typography>
          <Typography>
            <strong>Dimensione:</strong> {campo.dimensione_ha} ha
          </Typography>
          <Typography>
            <strong>Tipo di suolo:</strong> {campo.tipo_suolo}
          </Typography>
          {campo.prodotti?.length > 0 && (
            <Typography>
              <strong>Prodotti:</strong> {campo.prodotti.join(", ")}
            </Typography>
          )}
        </Box>

        {/* MAPPA */}
        <Paper
          sx={{
            flex: 1,
            height: { xs: 250, md: 350 },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <MapContainer
            center={[campo.coordinate.lat, campo.coordinate.lon]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[campo.coordinate.lat, campo.coordinate.lon]}>
              <Popup>{campo.nome_campo}</Popup>
            </Marker>
          </MapContainer>
        </Paper>
      </Box>

      {/* GRAFICI */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.background.default }}>
            <Typography variant="h6" gutterBottom>
              Produzione mensile (ton)
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={produzioneData}>
                <XAxis dataKey="mese" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valore" stroke={theme.palette.primary.main} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3, bgcolor: theme.palette.background.default }}>
            <Typography variant="h6" gutterBottom>
              Umidità settimanale (%)
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={meteoData}>
                <XAxis dataKey="giorno" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="umidità" stroke={theme.palette.secondary.main} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* CONDIZIONI ATTUALI */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: 2,
              bgcolor: theme.palette.warning.light,
            }}
          >
            <Typography variant="subtitle2">🌤 Temperatura</Typography>
            <Typography variant="h5">23°C</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: 2,
              bgcolor: theme.palette.info.light,
            }}
          >
            <Typography variant="subtitle2">💧 Umidità</Typography>
            <Typography variant="h5">60%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: 2,
              bgcolor: theme.palette.success.light,
            }}
          >
            <Typography variant="subtitle2">☔ Precipitazioni</Typography>
            <Typography variant="h5">2 mm</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
