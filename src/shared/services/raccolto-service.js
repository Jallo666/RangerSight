import { Raccolto } from "../model/model.js";
import campiService from "./campi-service.js";
import prodottiService from "./prodotti-service.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

async function generateRaccolti(count = 20) {
  const campi = await campiService.getAll();
  const prodotti = await prodottiService.getAll();
  const raccolti = [];

  for (let i = 1; i <= count; i++) {
    if (campi.length === 0 || prodotti.length === 0) break;

    const campo = campi[randomInt(0, campi.length - 1)];

    let prodotto;
    if (campo.prodotti && campo.prodotti.length > 0) {
      const codice = campo.prodotti[randomInt(0, campo.prodotti.length - 1)];
      prodotto = prodotti.find((p) => p.codice_prodotto === codice);
    } else {
      prodotto = prodotti[randomInt(0, prodotti.length - 1)];
    }

    if (!prodotto) continue;

    const quantità = randomInt(100, 2000);
    const unità = "kg"; // sempre kg
    const data_inizio = randomDate(new Date(2025, 0, 1), new Date(2025, 11, 31));
    const data_fine = addDays(data_inizio, prodotto.giorni_crescita || 30);

    raccolti.push(
      new Raccolto({
        attivita_id: i,
        id_campo: campo.id_campo,
        codice_prodotto: prodotto.codice_prodotto,
        quantità,
        unità_misura: unità,
        tipo_attivita: "raccolto",
        data_inizio,
        data_fine,
      })
    );
  }

  return raccolti;
}

const raccoltoService = {
  getAll: async () => generateRaccolti(30),

  getByCampo: async (idCampo) => {
    const all = await generateRaccolti(30);
    return all.filter((r) => r.id_campo === idCampo);
  },

  getByProdotto: async (codiceProdotto) => {
    const all = await generateRaccolti(30);
    return all.filter((r) => r.codice_prodotto === codiceProdotto);
  },

  getById: async (attivitaId) => {
    const all = await generateRaccolti(30);
    const r = all.find((r) => r.attivita_id === attivitaId);
    if (!r) throw new Error(`Raccolto con id ${attivitaId} non trovato`);
    return r;
  },

  add: async (raccoltoData) => new Raccolto(raccoltoData),
};

export default raccoltoService;
