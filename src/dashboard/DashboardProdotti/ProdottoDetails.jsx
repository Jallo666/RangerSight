import React from "react";
import { Grid, Paper, Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import ProdottoInfoCard from "./ProdottoInfoCard";
import ProdottoRaccoltiCard from "./ProdottoRaccoltiCard";
import ProdottoCrescita from "./ProdottoCrescita";


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
                <ProdottoCrescita prodotto={prodotto} />
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
