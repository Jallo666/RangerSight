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

export default function ProdottoRaccoltiCard({ prodotto }) {
  const [campi, setCampi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampi = async () => {
      try {
        setLoading(true);
        const data = await campiService.getByProdotto(prodotto.codice_prodotto);
        setCampi(data);
      } catch (err) {
        setError(err.message || "Errore nel caricamento dei campi");
      } finally {
        setLoading(false);
      }
    };

    if (prodotto?.codice_prodotto) {
      fetchCampi();
    }
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

  if (!campi.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Nessun campo trovato per {prodotto.nome}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Raccolti / Campi che usano {prodotto.nome}
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Campo</TableCell>
              <TableCell>Dimensione (ha)</TableCell>
              <TableCell>Tipo suolo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campi.map((campo) => (
              <TableRow key={campo.id_campo}>
                <TableCell>{campo.nome_campo}</TableCell>
                <TableCell>{campo.dimensione_ha}</TableCell>
                <TableCell>{campo.tipo_suolo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
