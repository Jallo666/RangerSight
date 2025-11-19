import { Raccolto } from "../shared/model/model.js";
import seedrandom from "seedrandom";
import { generateRangedWeather } from "../simulatore/meteo-simulator.js";

export function generateRaccoltiRanged(prodotto, campo, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const seed = `${prodotto.codice_prodotto}-${campo.id_campo}`;
  const rng = seedrandom(seed);

  const formatDate = (d) => d.toISOString().split("T")[0];
  const raccolti = [];
  let attivitaId = 1;

  const curr = new Date(start);
  while (curr <= end) {
    const dInizio = new Date(curr);
    const dFine = new Date(curr);

    const weather = generateRangedWeather(formatDate(dInizio), campo, prodotto.temperatura_ottimale.min, prodotto.temperatura_ottimale.max);
    const effMedia = weather.reduce((acc, w) => {
      const tempDiff = Math.abs((prodotto.temperatura_ottimale.min + prodotto.temperatura_ottimale.max)/2 - w.temperatura);
      return acc + Math.max(0, 1 - tempDiff / 10);
    }, 0) / weather.length;

    const quantitaBase = Math.floor(rng() * 1000) + 1;
    const quantitaEff = Math.round(quantitaBase * effMedia);

    raccolti.push(
      new Raccolto({
        attivita_id: attivitaId++,
        id_campo: campo.id_campo,
        codice_prodotto: prodotto.codice_prodotto,
        quantità: quantitaEff,
        unità_misura: "kg",
        tipo_attivita: prodotto.tipo_attività || "raccolto",
        data_inizio: formatDate(dInizio),
        data_fine: formatDate(dFine),
        nome_campo: campo.nome_campo,
        nome_prodotto: prodotto.nome,
      })
    );

    curr.setDate(curr.getDate() + 1);
  }

  return raccolti;
}
