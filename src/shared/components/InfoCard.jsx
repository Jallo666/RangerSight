import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const InfoCard = React.memo(function InfoCard({ icon, label, value, bgcolor, color }) {
    return (
        <Paper
            elevation={2}
            sx={{
                borderRadius: 3,
                px: 3,
                py: 1.5,
                textAlign: "center",
                minWidth: 130,
                bgcolor,
                color,
                flex: "1 1 40%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 4,
                },
            }}
        >
            <Box sx={{ fontSize: 36, mb: 0.5, display: "flex", justifyContent: "center" }}>
                {typeof icon === "string" ? icon : React.cloneElement(icon, { fontSize: "inherit" })}
            </Box>
            <Typography variant="body2">{label}</Typography>
            <Typography variant="h6" fontWeight="bold">
                {value}
            </Typography>
        </Paper>
    );
});

export default InfoCard;
