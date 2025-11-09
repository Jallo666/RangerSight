import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Grass, Timer, Cloud, Settings } from "@mui/icons-material";

import prodottiService from "../../shared/services/prodotti-service";
import InfoCard from "../../shared/components/InfoCard";
export default function CampoProdotti({ prodotti = [] }) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prodottiDettagli, setProdottiDettagli] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setSelectedIndex(0);

    const fetchProdotti = async () => {
      try {
        const allProdotti = await prodottiService.getAll();
        const prodottiAssociati = prodotti
          .map((codice) => allProdotti.find((p) => p.codice_prodotto === codice))
          .filter(Boolean);
        setProdottiDettagli(prodottiAssociati);
      } catch (error) {
        console.error("Errore nel caricamento dei prodotti associati:", error);
      } finally {
        setLoading(false);
      }
    };

    if (prodotti?.length > 0) fetchProdotti();
    else setLoading(false);
  }, [prodotti]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!prodottiDettagli || prodottiDettagli.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
        Nessun prodotto associato.
      </Typography>
    );
  }

  const prodotto = prodottiDettagli[selectedIndex];

  const realtimeData = {
    tempoCrescita: "72 giorni",
    ultimoRaccolto: "12 Set 2025",
    stato: "In crescita",
    influenzaMeteo: "Moderata",
  };

  const getInfluenzaColor = (livello) => {
    switch (livello.toLowerCase()) {
      case "bassa":
        return theme.palette.success.light;
      case "moderata":
        return theme.palette.warning.light;
      case "alta":
        return theme.palette.error.light;
      default:
        return theme.palette.grey[300];
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedIndex}
        onChange={(e, newValue) => setSelectedIndex(newValue)}
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minWidth: 140,
        }}
      >
        {prodottiDettagli.map((p, index) => (
          <Tab
            key={p.codice_prodotto}
            label={p.nome || p.codice_prodotto}
            sx={{
              alignItems: "flex-start",
              textTransform: "none",
              fontWeight: selectedIndex === index ? "bold" : "normal",
            }}
          />
        ))}
      </Tabs>

      <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" gutterBottom>
          {prodotto.nome}
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Typography><strong>Codice:</strong> {prodotto.codice_prodotto}</Typography>
        <Typography><strong>Tipo attività:</strong> {prodotto.tipo_attività}</Typography>
        {prodotto.descrizione && (
          <Typography sx={{ mt: 1 }}>
            <strong>Descrizione:</strong> {prodotto.descrizione}
          </Typography>
        )}

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <InfoCard
            icon={<Grass />}
            label="Tempo di crescita"
            value={prodotto.giorni_crescita}
            bgcolor={theme.palette.success.light}
            color={theme.palette.success.contrastText}
          />

          <InfoCard
            icon={<Timer />}
            label="Ultimo raccolto"
            value={realtimeData.ultimoRaccolto}
            bgcolor={theme.palette.info.light}
            color={theme.palette.info.contrastText}
          />

          <InfoCard
            icon={<Settings />}
            label="Stato"
            value={realtimeData.stato}
            bgcolor={theme.palette.warning.light}
            color={theme.palette.warning.contrastText}
          />

          <InfoCard
            icon={<Cloud />}
            label="Influenza meteo"
            value={realtimeData.influenzaMeteo}
            bgcolor={getInfluenzaColor(realtimeData.influenzaMeteo)}
            color={theme.palette.getContrastText(getInfluenzaColor(realtimeData.influenzaMeteo))}
          />
        </Box>
      </Box>
    </Box>
  );
}
