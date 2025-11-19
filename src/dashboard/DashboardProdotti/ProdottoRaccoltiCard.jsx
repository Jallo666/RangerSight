import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import campiService from "../../shared/services/campi-service";
import raccoltoService from "../../shared/services/raccolto-service";

export default function ProdottoRaccoltiCard({ prodotto, campo }) {
  const [raccolti, setRaccolti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaccolti = async () => {
      try {
        setLoading(true);
        const campi = await campiService.getByProdotto(prodotto.codice_prodotto);
        const oggi = new Date();
        const unMeseFa = new Date();
        unMeseFa.setMonth(oggi.getMonth() - 1);

        const allRaccolti = await Promise.all(
          campi.map(async (campo) => {
            const raccoltiCampo = await raccoltoService.getByProdottoRanged(
              prodotto,
              campo,
              unMeseFa.toISOString().split("T")[0],
              oggi.toISOString().split("T")[0]
            );
            return raccoltiCampo.map((r) => ({
              ...r,
              campo,
              eff: Math.round((r.quantità / raccoltoService.valoreAtteso(prodotto, campo)) * 100),
            }));
          })
        );

        setRaccolti(allRaccolti.flat());
      } catch (err) {
        setError(err.message || "Errore nel caricamento dei raccolti");
      } finally {
        setLoading(false);
      }
    };

    if (prodotto?.codice_prodotto) fetchRaccolti();
  }, [prodotto]);

  if (loading) {
    return (
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Errore: {error}</Typography>
      </Box>
    );
  }

  if (!raccolti.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Nessun raccolto trovato nell'ultimo mese per {prodotto.nome}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Raccolti ultimi 30 giorni per {prodotto.nome}
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Campo</TableCell>
              <TableCell>Data Inizio</TableCell>
              <TableCell>Data Fine</TableCell>
              <TableCell>Quantità</TableCell>
              <TableCell>Unità</TableCell>
              <TableCell>Efficienza (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {raccolti.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r.campo.nome_campo}</TableCell>
                <TableCell>{r.data_inizio}</TableCell>
                <TableCell>{r.data_fine}</TableCell>
                <TableCell>{r.quantità}</TableCell>
                <TableCell>{r.unità_misura}</TableCell>
                <TableCell>{r.eff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
