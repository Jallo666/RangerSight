import React, { useMemo } from "react";
import { Box, Button, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";

export default function CercaRaccolto({
  prodotti,
  campi,
  selectedProdotto,
  setSelectedProdotto,
  selectedCampo,
  setSelectedCampo,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onFilter,
}) {
  const today = new Date().toISOString().split("T")[0];

  const prodottiFiltrati = useMemo(() => {
    if (!selectedCampo) return [];
    return (prodotti || []).filter((p) => selectedCampo.prodotti.includes(p.codice_prodotto));
  }, [selectedCampo, prodotti]);

  const disableButton =
    !selectedCampo ||
    !selectedProdotto ||
    !startDate ||
    !endDate ||
    startDate > endDate ||
    startDate > today ||
    endDate > today;

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <FormControl>
        <InputLabel>Campo</InputLabel>
        <Select
          value={selectedCampo?.id_campo || ""}
          onChange={(e) => {
            const c = (campi || []).find((c) => c.id_campo === e.target.value);
            setSelectedCampo(c);
            setSelectedProdotto(null);
          }}
          sx={{ minWidth: 160 }}
        >
          {(campi || []).map((c) => (
            <MenuItem key={c.id_campo} value={c.id_campo}>
              {c.nome_campo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Prodotto</InputLabel>
        <Select
          value={selectedProdotto?.codice_prodotto || ""}
          onChange={(e) => {
            const p = (prodottiFiltrati || []).find((p) => p.codice_prodotto === e.target.value);
            setSelectedProdotto(p);
          }}
          sx={{ minWidth: 140 }}
          disabled={!selectedCampo}
        >
          {(prodottiFiltrati || []).map((p) => (
            <MenuItem key={p.codice_prodotto} value={p.codice_prodotto}>
              {p.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Data inizio"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: today }}
      />
      <TextField
        label="Data fine"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: today }}
      />
      <Button variant="contained" onClick={onFilter} disabled={disableButton}>
        Cerca
      </Button>
    </Box>
  );
}
