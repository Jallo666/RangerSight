import BASE_URLS from './config';

const aziendeService = {
  getAll: async () => {
    try {
      const response = await fetch(BASE_URLS.aziende);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Errore nel fetch delle aziende:', error);
      throw error;
    }
  },

  getById: async (idAzienda) => {
    try {
      const allAziende = await aziendeService.getAll();
      const azienda = allAziende.find(a => a.id_azienda === idAzienda);
      if (!azienda) {
        throw new Error(`Azienda con id ${idAzienda} non trovata`);
      }
      return azienda;
    } catch (error) {
      console.error('Errore nel fetch dell\'azienda:', error);
      throw error;
    }
  }
};

export default aziendeService;
