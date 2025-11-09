import React, { useEffect, useState } from "react";
import campiService from "../../shared/services/campi-service";
import CampoItem from "./CampoItem";
import CampoDetails from "./CampoDetails";
import SplitView from "../../shared/components/SplitView";
import aziendeService from "../../shared/services/aziende-service";
import CampoFilterDynamic from "./CampoFilterMock";
export default function DashboardCampi() {
  const [campi, setCampi] = useState([]);
  const [aziende, setAziende] = useState([]);

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


  useEffect(() => {
    const fetchCampi = async () => {
      try {
        const data = await aziendeService.getAll();
        setAziende(data || []);
      } catch (err) {
        console.error("Errore nel caricamento dei campi:", err);
      }
    };
    fetchCampi();
  }, []);

  function getNomeAziendaById(id) {
    const azienda = aziende.find(a => a.id_azienda === id);
    return azienda ? azienda.nome : null;
  }

  return (
    <SplitView
      title="Lista Campi"
      items={campi}
      groupBy={(campo) => `Azienda: ${getNomeAziendaById(campo.id_azienda)}`}
      renderItem={(campo, selectedCampo, setSelectedCampo, isLast) => (
        <CampoItem
          key={campo.id_campo}
          campo={campo}
          selectedCampo={selectedCampo}
          setSelectedCampo={setSelectedCampo}
          isLast={isLast}
        />
      )}
      renderFilter={() => (
        <CampoFilterDynamic
          fields={[
            { type: "text", name: "nomeCampo", label: "Nome campo" },
            {
              type: "checkbox-group",
              name: "attivita",
              label: "Tipo attività",
              options: [
                { label: "Agricoltura", value: "agricoltura" },
                { label: "Pesca", value: "pesca" },
                { label: "Allevamento", value: "allevamento" },
              ],
            },
            {
              type: "select",
              name: "regione",
              label: "Regione",
              options: [
                { label: "Nord", value: "nord" },
                { label: "Centro", value: "centro" },
                { label: "Sud", value: "sud" },
              ],
            },
          ]}
        />

      )}
      renderDetail={(campo) => <CampoDetails campo={campo} />}
      width={500}
    />
  );
}
