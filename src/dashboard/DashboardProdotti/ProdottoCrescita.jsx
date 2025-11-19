import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, LinearProgress, Paper } from "@mui/material";
import campiService from "../../shared/services/campi-service";
import raccoltoService from "../../shared/services/raccolto-service";

export default function ProdottoCrescita({ prodotto }) {
  const [efficienza, setEfficienza] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEfficienza = async () => {
      setLoading(true);
      const oggi = new Date();
      const unMeseFa = new Date();
      unMeseFa.setMonth(oggi.getMonth() - 1);

      try {
        const campi = await campiService.getByProdotto(prodotto.codice_prodotto);
        const raccoltiPerCampo = await Promise.all(
          campi.map(async (campo) => {
            const raccolti = await raccoltoService.getByProdottoRanged(
              prodotto,
              campo,
              unMeseFa.toISOString().split("T")[0],
              oggi.toISOString().split("T")[0]
            );
            return raccolti.map((r) => ({
              ...r,
              eff: Math.round((r.quantità / raccoltoService.valoreAtteso(prodotto, campo)) * 100),
            }));
          })
        );
        const tuttiRaccolti = raccoltiPerCampo.flat();
        if (tuttiRaccolti.length > 0) {
          const media = Math.round(
            tuttiRaccolti.reduce((acc, r) => acc + r.eff, 0) / tuttiRaccolti.length
          );
          setEfficienza(media);
        } else {
          setEfficienza(0);
        }
      } finally {
        setLoading(false);
      }
    };

    if (prodotto?.codice_prodotto) fetchEfficienza();
  }, [prodotto]);

  if (loading) {
    return (
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Typography variant="h6">Efficienza media ultimi 30 giorni</Typography>
      <Typography variant="h3" color={efficienza >= 80 ? "success.main" : efficienza >= 50 ? "warning.main" : "error.main"}>
        {efficienza}%
      </Typography>
      <Paper sx={{ width: "100%", height: 10, borderRadius: 5, overflow: "hidden" }}>
        <LinearProgress
          variant="determinate"
          value={efficienza}
          sx={{
            height: "100%",
            borderRadius: 5,
            backgroundColor: "#eee",
            "& .MuiLinearProgress-bar": {
              backgroundColor:
                efficienza >= 80 ? "success.main" : efficienza >= 50 ? "warning.main" : "error.main",
            },
          }}
        />
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Basata su tutti i campi attivi del prodotto nell'ultimo mese
      </Typography>
    </Box>
  );
}