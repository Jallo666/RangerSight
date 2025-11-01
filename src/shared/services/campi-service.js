import BASE_URLS from "./config";

const campiService = {
  // 🔹 Recupera tutti i campi
  getAll: async () => {
    try {
      const response = await fetch(BASE_URLS.campi);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore nel fetch dei campi:", error);
      throw error;
    }
  },

  // 🔹 Filtra i campi per azienda
  getByAzienda: async (idAzienda) => {
    try {
      const allCampi = await campiService.getAll();
      return allCampi.filter((campo) => campo.id_azienda === idAzienda);
    } catch (error) {
      console.error("Errore nel fetch dei campi per azienda:", error);
      throw error;
    }
  },

  // 🔹 Recupera un singolo campo per id
  getById: async (idCampo) => {
    try {
      const allCampi = await campiService.getAll();
      const campo = allCampi.find((c) => c.id_campo === idCampo);
      if (!campo) {
        throw new Error(`Campo con id ${idCampo} non trovato`);
      }
      return campo;
    } catch (error) {
      console.error("Errore nel fetch del campo:", error);
      throw error;
    }
  },
};

export default campiService;
