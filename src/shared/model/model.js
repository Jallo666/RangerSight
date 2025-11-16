import { Agriculture, Pets, Terrain, Forest, EmojiNature  } from "@mui/icons-material";
import PhishingIcon from '@mui/icons-material/Phishing';
export const TipiAttivitaColori = {
  agricoltura: {
    bgColor: "#4CAF50",
    textColor: "#FFFFFF",
    icon: Agriculture,
  },
  pesca: {
    bgColor: "#2196F3",
    textColor: "#FFFFFF",
    icon: PhishingIcon,
  },
  allevamento: {
    bgColor: "#A0522D",
    textColor: "#FFFFFF",
    icon: Pets,
  },
  estrazione: {
    bgColor: "#9E9E9E",
    textColor: "#000000",
    icon: Terrain,
  },
  silvicoltura: {
    bgColor: "#2E8B57",
    textColor: "#FFFFFF",
    icon: Forest,
  },
  apicoltura: {
    bgColor: "#FFC107",
    textColor: "#000000",
    icon: EmojiNature, 
  },
};
export class Azienda {
  constructor({ id_azienda, nome, tipo, contatto, campi = [] }) {
    this.id_azienda = id_azienda;
    this.nome = nome;
    this.tipo = tipo;
    this.contatto = contatto;
    this.campi = campi;
  }
}

export class Campo {
  constructor({
    id_campo,
    id_azienda,
    nome_campo,
    tipo_attività,
    dimensione_ha,
    tipo_suolo,
    coordinate,
    altitudine,
    prodotti = [],
  }) {
    this.id_campo = id_campo;
    this.id_azienda = id_azienda;
    this.nome_campo = nome_campo;
    this.tipo_attività = tipo_attività;
    this.dimensione_ha = dimensione_ha;
    this.tipo_suolo = tipo_suolo;
    this.coordinate = coordinate;
    this.altitudine = altitudine;
    this.prodotti = prodotti;
  }
}

export class TemperaturaOttimale {
  constructor({ min, max }) {
    this.min = min;
    this.max = max;
  }
}

export class Prodotto {
  constructor({ codice_prodotto, nome, giorni_crescita, tipo_attività, temperatura_ottimale, descrizione }) {
    this.codice_prodotto = codice_prodotto;
    this.nome = nome;
    this.giorni_crescita = giorni_crescita;
    this.tipo_attività = tipo_attività;
    this.temperatura_ottimale = temperatura_ottimale 
      ? new TemperaturaOttimale(temperatura_ottimale) 
      : new TemperaturaOttimale({ min: null, max: null });
    this.descrizione = descrizione;
  }
}

export class AttivitaCampo {
  constructor({ attivita_id, id_campo, tipo_attivita, data_inizio, data_fine }) {
    this.attivita_id = attivita_id;
    this.id_campo = id_campo;
    this.tipo_attivita = tipo_attivita;
    this.data_inizio = data_inizio;
    this.data_fine = data_fine;
  }
}

export class Raccolto extends AttivitaCampo {
  constructor({ codice_prodotto, quantità, unità_misura, ...rest }) {
    super({ ...rest });
    this.codice_prodotto = codice_prodotto;
    this.quantità = quantità;
    this.unità_misura = unità_misura;
  }
}

export class Manutenzione extends AttivitaCampo {
  constructor({ note, ...rest }) {
    super({ ...rest });
    this.note = note;
  }
}

export class Straordinaria extends AttivitaCampo {
  constructor({ note, ...rest }) {
    super({ ...rest });
    this.note = note;
  }
}

export class MeteoCampo {
  constructor({ data, temperatura, umidità, precipitazioni }) {
    this.data = data;                    
    this.temperatura = temperatura;      
    this.umidità = umidità;              
    this.precipitazioni = precipitazioni;
  }
}