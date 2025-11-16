import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function TimeRangePicker({ onSubmit }) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const currentHour = now.getHours();

  const [startDate, setStartDate] = useState(todayStr);
  const [startHour, setStartHour] = useState(currentHour);
  const [endDate, setEndDate] = useState(todayStr);
  const [endHour, setEndHour] = useState(currentHour + 1);

  const [error, setError] = useState("");

  const handleSubmit = () => {
    const start = new Date(startDate);
    start.setHours(startHour, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(endHour, 0, 0, 0);

    if (start >= end) {
      setError("L'orario di inizio deve essere precedente a quello di fine.");
      return;
    }

    setError("");
    onSubmit({ start, end });
  };

  const formatDateTime = (date, hour) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}/${month} ${hour}:00`;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Meteo dal {formatDateTime(startDate, startHour)} al {formatDateTime(endDate, endHour)}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          label="Da (data)"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        <TextField
          label="Ora"
          type="number"
          inputProps={{ min: 0, max: 23 }}
          value={startHour}
          onChange={(e) => setStartHour(Number(e.target.value))}
          size="small"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          label="A (data)"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        <TextField
          label="Ora"
          type="number"
          inputProps={{ min: 0, max: 23 }}
          value={endHour}
          onChange={(e) => setEndHour(Number(e.target.value))}
          size="small"
        />
      </Box>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1 }}>
        Aggiorna
      </Button>
    </Box>
  );
}
