import React from "react";
import { Grid, Paper, Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import ProdottoInfoCard from "./ProdottoInfoCard";
import ProdottoRaccoltiCard from "./ProdottoRaccoltiCard";

function ProdottoCrescita() {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6">Crescita</Typography>
            <Typography>Qui puoi aggiungere info su giorni di crescita o stato raccolto</Typography>
        </Box>
    );
}


export default function ProdottoDetails({ prodotto }) {
    return (
        <Grid
            container
            sx={{
                height: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: 2,
            }}
        >
            <Paper sx={{ borderRadius: 3, boxShadow: 3 }}>
                <ProdottoInfoCard prodotto={prodotto} />
            </Paper>

            <Paper sx={{ borderRadius: 3, boxShadow: 3, display: "flex", flexDirection: "column" }}>
                <ProdottoCrescita />
            </Paper>

            <Paper
                sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    gridColumn: "1 / -1",
                }}
            >
                <ProdottoRaccoltiCard prodotto={prodotto} />
            </Paper>
        </Grid>
    );
}
