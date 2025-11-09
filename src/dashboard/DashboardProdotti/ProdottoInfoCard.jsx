import React from "react";
import { Box, Typography } from "@mui/material";
import { Badge, Timer, Thermostat } from "@mui/icons-material";
import InfoCard from "../../shared/components/InfoCard";
import { TipiAttivitaColori } from "../../shared/model/model";

export default function ProdottoInfoCard({ prodotto }) {
    const tipoColore = TipiAttivitaColori[prodotto.tipo_attività] || {
        bgColor: "#e0e0e0",
        textColor: "#000",
    };

    const IconComponent = TipiAttivitaColori[prodotto.tipo_attività]?.icon || Thermostat;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={1}>
                {prodotto.nome}
            </Typography>

            {prodotto.descrizione && (
                <Box
                    sx={{
                        bgcolor: "grey.100",
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {prodotto.descrizione}
                    </Typography>
                </Box>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <InfoCard
                    icon={<Badge />}
                    label="Codice"
                    value={prodotto.codice_prodotto}
                    bgcolor="#fff3e0"
                    color="#e65100"
                />
                <InfoCard
                    icon={<IconComponent />}
                    label="Tipo attività"
                    value={prodotto.tipo_attività.charAt(0).toUpperCase() + prodotto.tipo_attività.slice(1)}
                    bgcolor={tipoColore.bgColor}
                    color={tipoColore.textColor}
                />
                <InfoCard
                    icon={<Timer />}
                    label="Giorni di crescita"
                    value={prodotto.giorni_crescita ?? "-"}
                    bgcolor="#e8f5e9"
                    color="#1b5e20"
                />
                {prodotto.temperatura_ottimale && (
                    <InfoCard
                        icon={<Thermostat />}
                        label="Temperatura ottimale"
                        value={`${prodotto.temperatura_ottimale.min}°C - ${prodotto.temperatura_ottimale.max}°C`}
                        bgcolor="#ffebee"
                        color="#b71c1c"
                    />
                )}
            </Box>
        </Box>
    );
}
