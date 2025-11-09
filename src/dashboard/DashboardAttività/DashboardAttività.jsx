import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import raccoltoService from "../../shared/services/raccolto-service";

const manutenzioneService = { getAll: async () => [] };

export default function DashboardAttivita() {
  const [activeTab, setActiveTab] = useState(0);
  const [raccolti, setRaccolti] = useState([]);
  const [manutenzioni, setManutenzioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [orderBy, setOrderBy] = useState("data_inizio");
  const [orderDirection, setOrderDirection] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [raccoltiData, manutenzioniData] = await Promise.all([
          raccoltoService.getAll(),
          manutenzioneService.getAll(),
        ]);
        setRaccolti(raccoltiData);
        setManutenzioni(manutenzioniData);
      } catch (err) {
        setError(err.message || "Errore nel caricamento delle attività");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleSort = (col) => {
    if (orderBy === col) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    } else {
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

  const renderTable = (attivita, tipo) => {
    if (!attivita.length) {
      return (
        <Box sx={{ p: 2 }}>
          <Typography>Nessuna attività di {tipo} presente</Typography>
        </Box>
      );
    }

    const sortedData = sortData(attivita);

    const columns = [
      { id: "id_campo", label: "Campo ID" },
      ...(tipo === "raccolto" ? [{ id: "codice_prodotto", label: "Prodotto" }] : []),
      { id: "data_inizio", label: "Data Inizio" },
      { id: "data_fine", label: "Data Fine" },
      ...(tipo === "raccolto"
        ? [
            { id: "quantità", label: "Quantità" },
            { id: "unità_misura", label: "Unità" },
          ]
        : [{ id: "note", label: "Note" }]),
    ];

    return (
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? orderDirection : "asc"}
                  onClick={() => handleSort(col.id)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow key={item.attivita_id} hover>
              <TableCell>{item.id_campo}</TableCell>
              {tipo === "raccolto" && <TableCell>{item.codice_prodotto}</TableCell>}
              <TableCell>{item.data_inizio}</TableCell>
              <TableCell>{item.data_fine}</TableCell>
              {tipo === "raccolto" ? (
                <>
                  <TableCell>{item.quantità}</TableCell>
                  <TableCell>{item.unità_misura}</TableCell>
                </>
              ) : (
                <TableCell>{item.note || "-"}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: "100%", p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 2 }}>
        <Tab label={`Raccolto (${raccolti.length})`} />
        <Tab label={`Manutenzione (${manutenzioni.length})`} />
      </Tabs>

      <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
        {activeTab === 0 && renderTable(raccolti, "raccolto")}
        {activeTab === 1 && renderTable(manutenzioni, "manutenzione")}
      </Box>
    </Paper>
  );
}
