import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme, Button, ButtonGroup, Box } from "@mui/material";

export default function LineChartMeteo({ dati }) {
  const theme = useTheme();

  const [datoAttivo, setDatoAttivo] = useState("temperatura");

const giorniUnici = Array.from(new Set(dati.map(d => new Date(d.data).toDateString())));

const datiConOre = dati.map(d => {
  const dt = new Date(d.data);
  const giorno = dt.getDate();
  const mese = dt.getMonth() + 1;
  const ora = dt.getHours().toString().padStart(2, "0") + ":00";

  return {
    ...d,
    ora: giorniUnici.length > 1 ? `${giorno}/${mese} ${ora}` : ora,
  };
});

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <ButtonGroup variant="outlined" sx={{ alignSelf: "center" }}>
        <Button
          color={datoAttivo === "temperatura" ? "warning" : "inherit"}
          onClick={() => setDatoAttivo("temperatura")}
        >
          Temperatura
        </Button>
        <Button
          color={datoAttivo === "umidità" ? "info" : "inherit"}
          onClick={() => setDatoAttivo("umidità")}
        >
          Umidità
        </Button>
        <Button
          color={datoAttivo === "precipitazioni" ? "success" : "inherit"}
          onClick={() => setDatoAttivo("precipitazioni")}
        >
          Precipitazioni
        </Button>
      </ButtonGroup>

      {/* 🔹 Grafico */}
      <Box sx={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={datiConOre} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="ora" />

            <YAxis
              yAxisId="left"
              stroke={theme.palette.text.secondary}
              label={{
                value:
                  datoAttivo === "temperatura"
                    ? "°C"
                    : datoAttivo === "umidità"
                    ? "%"
                    : "mm",
                angle: -90,
                position: "insideLeft",
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

            {datoAttivo === "temperatura" && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperatura"
                stroke={theme.palette.warning.main}
                strokeWidth={2}
                name="Temperatura (°C)"
                dot={false}
              />
            )}
            {datoAttivo === "umidità" && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="umidità"
                stroke={theme.palette.info.main}
                strokeWidth={2}
                name="Umidità (%)"
                dot={false}
              />
            )}
            {datoAttivo === "precipitazioni" && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="precipitazioni"
                stroke={theme.palette.success.main}
                strokeWidth={2}
                name="Precipitazioni (mm)"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
