import BASE_URLS from "./config";

const prodottiService = {
  getAll: async () => {
    try {
      const response = await fetch(BASE_URLS.prodotti);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore nel fetch dei prodotti:", error);
      throw error;
    }
  },

  getByCodice: async (codiceProdotto) => {
    try {
      const allProdotti = await prodottiService.getAll();
      const prodotto = allProdotti.find(
        (p) => p.codice_prodotto === codiceProdotto
      );
      if (!prodotto) {
        throw new Error(`Prodotto con codice ${codiceProdotto} non trovato`);
      }
      return prodotto;
    } catch (error) {
      console.error("Errore nel fetch del prodotto:", error);
      throw error;
    }
  },

  getByTipoAttività: async (tipoAttività) => {
    try {
      const allProdotti = await prodottiService.getAll();
      return allProdotti.filter(
        (p) => p.tipo_attività.toLowerCase() === tipoAttività.toLowerCase()
      );
    } catch (error) {
      console.error("Errore nel fetch dei prodotti per tipo di attività:", error);
      throw error;
    }
  },
};

export default prodottiService;
