import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import InfoCard from "../../shared/components/InfoCard";
import meteoService from "../../shared/services/meteo-service";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GrainIcon from "@mui/icons-material/Grain";

export default function CampoMeteo({ coordinate }) {
  const theme = useTheme();
  const [dati, setDati] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeteo = async () => {
      try {
        setLoading(true);

        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 7 * 24 * 3600 * 1000); // ultimi 7 giorni

        const data = await meteoService.getMeteo(
          coordinate?.lat,
          coordinate?.lon,
          startTime,
          endTime,
          3600 
        );

        setDati({
          storico: data.map((d) => ({
            giorno: new Date(d.data).toLocaleDateString("it-IT", {
              weekday: "short",
            }),
            temperatura: d.temperatura,
            umidità: d.umidità,
          })),
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

      {/* 🔹 Grafico doppio asse */}
      <Box sx={{ flex: 1, minHeight: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={storico}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="giorno" stroke={theme.palette.text.secondary} />
            <YAxis
              yAxisId="left"
              stroke={theme.palette.text.secondary}
              label={{
                value: "°C",
                angle: -90,
                position: "insideLeft",
                style: { fill: theme.palette.text.secondary },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={theme.palette.text.secondary}
              label={{
                value: "%",
                angle: 90,
                position: "insideRight",
                style: { fill: theme.palette.text.secondary },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 8,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperatura"
              stroke={theme.palette.warning.main}
              strokeWidth={2}
              name="Temperatura (°C)"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="umidità"
              stroke={theme.palette.info.main}
              strokeWidth={2}
              name="Umidità (%)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
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
