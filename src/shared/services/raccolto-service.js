import { generateRaccoltiRanged } from "../../simulatore/raccolto-simulator.js";

const raccoltoService = {
  getByProdottoRanged: async (prodotto, campo, startDate, endDate) => {
    return generateRaccoltiRanged(prodotto, campo, startDate, endDate);
  },

  valoreAtteso: (prodotto, campo) => {
    const kgPerHa = 1000;
    return campo.dimensione_ha * kgPerHa;
  },
};

export default raccoltoService;