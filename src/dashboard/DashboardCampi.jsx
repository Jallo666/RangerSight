import React, { useEffect, useState } from "react";
import campiService from "../shared/services/campi-service";
import CampoItem from "./CampoItem";
import CampoDetails from "./CampoDetails";
import SplitView from "../shared/components/SplitView";
export default function DashboardCampi() {
  const [campi, setCampi] = useState([]);

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
      title="Lista Campi"
      items={campi}
      groupBy={(campo) => `Azienda ${campo.id_azienda}`}
      renderItem={(campo, selectedCampo, setSelectedCampo, isLast) => (
        <CampoItem
          key={campo.id_campo}
          campo={campo}
          selectedCampo={selectedCampo}
          setSelectedCampo={setSelectedCampo}
          isLast={isLast}
        />
      )}
      renderDetail={(campo) => <CampoDetails campo={campo} />}
      width={500}
    />
  );
}
