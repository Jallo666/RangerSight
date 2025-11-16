import seedrandom from "seedrandom";

/**
 * Modula le temperature min/max in base al mese (stagione)
 */
function getSeasonalTemps(month, baseMinTemp, baseMaxTemp) {
  let minTemp = baseMinTemp;
  let maxTemp = baseMaxTemp;

  if ([11, 0, 1].includes(month)) {       
    minTemp -= 5;
    maxTemp -= 5;
  } else if ([2, 3, 4].includes(month)) { a
    minTemp += 0;
    maxTemp += 0;
  } else if ([5, 6, 7].includes(month)) { 
    minTemp += 5;
    maxTemp += 5;
  } 

  return [minTemp, maxTemp];
}

/**
 * Genera meteo realistico per un giorno intero con stagioni e pioggia/notte
 */
export function generateDailyWeather(oggi, campoId, baseMinTemp = 5, baseMaxTemp = 25, minUmid = 40, maxUmid = 95) {
  const rng = seedrandom(`${oggi}-${campoId}`);
  const piccoOra = 14;
  const dati = [];
  const month = new Date(oggi).getMonth();
  const [minTemp, maxTemp] = getSeasonalTemps(month, baseMinTemp, baseMaxTemp);

  for (let ora = 0; ora < 24; ora++) {
    // ===== Temperatura =====
    const angle = ((ora - piccoOra + 12) / 24) * 2 * Math.PI;
    const trendTemp = (Math.sin(angle) * (maxTemp - minTemp) / 2) + ((maxTemp + minTemp) / 2);
    const fluctTemp = rng() * 2 - 1;
    const temperatura = Math.min(maxTemp, Math.max(minTemp, trendTemp + fluctTemp));

    // ===== Umidità =====
    let baseUmid = maxUmid - ((temperatura - minTemp) / (maxTemp - minTemp)) * (maxUmid - minUmid);
    // Fluttuazioni casuali ±2.5%
    baseUmid += rng() * 5 - 2.5;
    const umidita = Math.min(maxUmid, Math.max(minUmid, baseUmid));

    // ===== Precipitazioni =====
    let probPioggia = 0;
    // solo tra le 6 e le 20
    if (ora >= 6 && ora <= 20) {
      probPioggia = (umidita - 60) / 40;
      probPioggia = Math.min(1, Math.max(0, probPioggia));
    }
    const precipitazioni = rng() < probPioggia ? parseFloat((rng() * 5).toFixed(1)) : 0;

    // ===== Timestamp =====
    const timestamp = new Date(`${oggi}T${String(ora).padStart(2, '0')}:00:00Z`).toISOString();

    dati.push({
      data: timestamp,                 // invece di timestamp
      temperatura: parseFloat(temp.toFixed(1)),
      umidità: parseFloat(umidita.toFixed(1)), // con accento
      precipitazioni
    });
  }

  return dati;
}


/**
 * Genera meteo pseudo-realistico per un intervallo di ore con stagioni
 */
export function generateRangedWeather(oggi, campoId, baseMinTemp = 5, baseMaxTemp = 25, minUmid = 40, maxUmid = 95, hours = 24) {
  const rng = seedrandom(`${oggi}-${campoId}`);
  const piccoOra = 14;
  const dati = [];

  const month = new Date(oggi).getMonth();
  const [minTemp, maxTemp] = getSeasonalTemps(month, baseMinTemp, baseMaxTemp);

  for (let ora = 0; ora < hours; ora++) {
    const angle = ((ora - piccoOra + 12) / hours) * 2 * Math.PI;
    const trendTemp = (Math.sin(angle) * (maxTemp - minTemp) / 2) + ((maxTemp + minTemp) / 2);
    const fluctTemp = rng() * 2 - 1;
    const temperatura = Math.min(maxTemp, Math.max(minTemp, trendTemp + fluctTemp));

    const baseUmid = maxUmid - ((temperatura - minTemp) / (maxTemp - minTemp)) * (maxUmid - minUmid);
    const fluctUmid = rng() * 5 - 2.5;
    const umidita = Math.min(maxUmid, Math.max(minUmid, baseUmid + fluctUmid));

    let probPioggia = (umidita - 60) / 40;
    probPioggia = Math.min(1, Math.max(0, probPioggia));
    const precipitazioni = rng() < probPioggia ? parseFloat((rng() * 5).toFixed(1)) : 0;

    const timestamp = new Date(`${oggi}T${String(ora).padStart(2, '0')}:00:00Z`).toISOString();

    dati.push({
      timestamp,
      temperatura: parseFloat(temperatura.toFixed(1)),
      umidita: parseFloat(umidita.toFixed(1)),
      precipitazioni
    });
  }

  return dati;
}
