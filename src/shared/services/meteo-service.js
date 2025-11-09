function getRandom(min, max, decimals = 1) {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(decimals));
}

function formatDate(date) {
  return date.toISOString();
}

const meteoService = {
  getMeteo: async (lat, lon, startTime, endTime, aggregazione = 3600) => {
    try {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const result = [];

      let temperatura = getRandom(18, 28);
      let umidità = getRandom(50, 80);
      let precipitazioni = getRandom(0, 5);

      for (let t = start.getTime(); t <= end.getTime(); t += aggregazione * 1000) {
        result.push({
          data: formatDate(new Date(t)),
          temperatura: parseFloat(temperatura.toFixed(1)),
          umidità: parseFloat(umidità.toFixed(1)),
          precipitazioni: parseFloat(precipitazioni.toFixed(1)),
        });

        const tempDelta = getRandom(-1, 1);
        temperatura = Math.min(35, Math.max(10, temperatura + tempDelta));

        const umidTrend = -tempDelta * getRandom(0.8, 1.2);
        const umidRandom = getRandom(-1.5, 1.5);
        umidità = Math.min(100, Math.max(20, umidità + umidTrend + umidRandom));

        let probPioggia = (umidità - 60) / 40;
        probPioggia = Math.min(1, Math.max(0, probPioggia));

        const precDelta =
          precipitazioni > 0
            ? getRandom(-1.5, 1)
            : Math.random() < probPioggia * 0.2
            ? getRandom(0, 3)
            : 0;

        precipitazioni = Math.max(0, Math.min(30, precipitazioni + precDelta));
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));

      return result;
    } catch (error) {
      console.error("Errore nella generazione dei dati meteo:", error);
      throw error;
    }
  },
};

export default meteoService;
