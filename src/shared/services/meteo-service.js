import { generateRangedWeather } from "../../simulatore/meteo-simulator";

const meteoService = {
  getMeteo: async (campo, startTime, endTime, aggregazione = 3600) => {
    try {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const result = [];

      let current = new Date(start);

      while (current <= end) {
        const day = current.toISOString().slice(0, 10);
        const hour = current.getUTCHours();
        const weather = generateRangedWeather(day, campo, 5, 25, 40, 95, 24);

        const entry = weather[hour];

        result.push({
          data: entry.timestamp,
          temperatura: entry.temperatura,
          umidità: entry.umidita,
          precipitazioni: entry.precipitazioni,
        });

        current = new Date(current.getTime() + aggregazione * 1000);
      }

      return result;
    } catch (error) {
      console.error("Errore nella generazione dei dati meteo:", error);
      throw error;
    }
  },
};

export default meteoService;
