import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  CircularProgress,
} from "@mui/material";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import CercaRaccolto from "./CercaRaccolto";

import prodottiService from "../../shared/services/prodotti-service";
import campiService from "../../shared/services/campi-service";
import raccoltoService from "../../shared/services/raccolto-service";

export default function DashboardAttivita() {
  const [raccolti, setRaccolti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [prodotti, setProdotti] = useState([]);
  const [campi, setCampi] = useState([]);

  const [orderBy, setOrderBy] = useState("data_inizio");
  const [orderDirection, setOrderDirection] = useState("asc");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProdotto, setSelectedProdotto] = useState(null);
  const [selectedCampo, setSelectedCampo] = useState(null);

  useEffect(() => {
    const fetchDati = async () => {
      try {
        const [prodottiData, campiData] = await Promise.all([
          prodottiService.getAll(),
          campiService.getAll(),
        ]);
        setProdotti(prodottiData);
        setCampi(campiData);
        setSelectedProdotto(prodottiData[0] || null);
        setSelectedCampo(campiData[0] || null);
      } catch {
        setError("Errore nel caricamento di prodotti o campi");
      }
    };
    fetchDati();
  }, []);

  const handleSort = (col) => {
    if (orderBy === col) setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    else {
      setOrderBy(col);
      setOrderDirection("asc");
    }
  };

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      let aVal = a[orderBy];
      let bVal = b[orderBy];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return orderDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return orderDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const renderTable = () => {
    if (!raccolti.length) return <Typography sx={{ p: 2 }}>Nessun raccolto trovato</Typography>;

    const sortedData = sortData(raccolti);

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "nome_campo"}
                direction={orderDirection}
                onClick={() => handleSort("nome_campo")}
              >
                Campo
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "nome_prodotto"}
                direction={orderDirection}
                onClick={() => handleSort("nome_prodotto")}
              >
                Prodotto
              </TableSortLabel>
            </TableCell>
            <TableCell>Data Inizio</TableCell>
            <TableCell>Data Fine</TableCell>
            <TableCell>Quantità</TableCell>
            <TableCell>Unità</TableCell>
            <TableCell>Efficienza</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((r, idx) => {
            const valoreAtteso = raccoltoService.valoreAtteso(r.prodottoObj, r.campoObj);
            const effPercent = Math.round((r.quantità / valoreAtteso) * 100);
            return (
              <TableRow key={idx} hover>
<TableCell>{r.nome_campo}</TableCell>
<TableCell>{r.nome_prodotto}</TableCell>
<TableCell>{r.data_inizio}</TableCell>
<TableCell>{r.data_fine}</TableCell>
<TableCell>{r.quantità}</TableCell>
<TableCell>{r.unità_misura}</TableCell>
<TableCell>
  <ResponsiveContainer width={100} height={30}>
    <BarChart data={[{ eff: Math.round((r.quantità / raccoltoService.valoreAtteso(r.prodottoObj, r.campoObj)) * 100) }]}>
      <Bar dataKey="eff" fill="#4caf50" />
    </BarChart>
  </ResponsiveContainer>
  {Math.round((r.quantità / raccoltoService.valoreAtteso(r.prodottoObj, r.campoObj)) * 100)}%
</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const handleFilter = async () => {
    if (!selectedProdotto || !selectedCampo) return;

    try {
      setLoading(true);
      setError(null);

      const resultsRaw = await raccoltoService.getByProdottoRanged(
        selectedProdotto,
        selectedCampo,
        startDate || "2025-01-01",
        endDate || "2025-12-31"
      );

const sanitized = resultsRaw.map((r) => ({
  id_campo: r.id_campo,
  codice_prodotto: r.codice_prodotto,
  campoObj: selectedCampo,
  prodottoObj: selectedProdotto,
  nome_campo: r.nome_campo,
  nome_prodotto: r.nome_prodotto,
  data_inizio: r.data_inizio,
  data_fine: r.data_fine,
  quantità: r.quantità,
  unità_misura: r.unità_misura,
}));

      setRaccolti(sanitized);
    } catch {
      setError("Errore nel caricamento dei raccolti");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Attività di Raccolto
      </Typography>

      {prodotti.length > 0 && campi.length > 0 ? (
        <CercaRaccolto
          prodotti={prodotti}
          campi={campi}
          selectedProdotto={selectedProdotto}
          setSelectedProdotto={setSelectedProdotto}
          selectedCampo={selectedCampo}
          setSelectedCampo={setSelectedCampo}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onFilter={handleFilter}
        />
      ) : (
        <CircularProgress />
      )}

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {loading ? <CircularProgress /> : renderTable()}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Paper>
  );
}
