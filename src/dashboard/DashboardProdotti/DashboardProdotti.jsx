import React, { useEffect, useState } from "react";
import prodottiService from "../../shared/services/prodotti-service";
import campiService from "../../shared/services/campi-service";
import SplitView from "../../shared/components/SplitView";
import { Box, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import { TipiAttivitaColori } from "../../shared/model/model";
import ProdottoDetails from "./ProdottoDetails"; 

export default function DashboardProdotti() {
  const [prodotti, setProdotti] = useState([]);
  const [campi, setCampi] = useState([]);

  useEffect(() => {
    const fetchProdotti = async () => {
      try {
        const data = await prodottiService.getAll();
        setProdotti(data || []);
      } catch (err) {
        console.error("Errore nel caricamento dei prodotti:", err);
      }
    };
    fetchProdotti();
  }, []);

  useEffect(() => {
    const fetchCampi = async () => {
      try {
        const data = await campiService.getAll();
        setCampi(data || []);
      } catch (err) {
        console.error("Errore nel caricamento dei campi:", err);
      }
    };
    fetchCampi();
  }, []);

  return (
    <SplitView
      title="Lista Prodotti"
      items={prodotti}
      groupBy={(prodotto) =>
        prodotto.tipo_attività.charAt(0).toUpperCase() + prodotto.tipo_attività.slice(1)
      }
      renderItem={(prodotto, selectedProdotto, setSelectedProdotto, isLast) => {
        const isSelected = selectedProdotto?.codice_prodotto === prodotto.codice_prodotto;

        const tipoColor = TipiAttivitaColori[prodotto.tipo_attività]?.bgColor || "#e0e0e0";
        const background = isSelected ? "action.selected" : `${tipoColor}20`;

        return (
          <>
            <ListItem
              onClick={() => setSelectedProdotto(prodotto)}
              selected={isSelected}
              sx={{
                py: 1.5,
                px: 2,
                cursor: "pointer",
                backgroundColor: background,
                borderLeft: "4px solid",
                borderLeftColor: isSelected ? "primary.main" : "transparent",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
                "&.Mui-selected": {
                  bgcolor: "action.selected",
                },
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemText
                primaryTypographyProps={{ component: "div" }}
                secondaryTypographyProps={{ component: "div" }}
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {prodotto.nome}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Codice: {prodotto.codice_prodotto} · Giorni crescita: {prodotto.giorni_crescita}
                  </Typography>
                }
              />
            </ListItem>
            {!isLast && <Divider />}
          </>
        );
      }}
      renderFilter={() => <></>}
      renderDetail={(prodotto) => (
        <ProdottoDetails prodotto={prodotto} /> 
      )}
      width={500}
    />
  );
}
