import Account from "./Account";
import Lista from "./Lista";

class DatiApp {
  serverUrl: string;
  account: Account;
  setAccount: (newAccount:Account) => void;
  logout: () => void;
  liste: Lista[];
  aggiungiListaInLocale: (l: Lista) => void;
  rimuoviListaInLocale: (id: string) => void;
  modificaListaInLocale: (listaModificata: Lista) => void;
  oggettiPrecedenti: string[];
  aggiungiOggettoInLocale: (oggetto: string) => void;
  rimuoviOggettoInLocale: (oggetto: string) => void;
  rimuoviTuttiOggettiInLocale: () => void;
  

  constructor(
    serverUrl: string,
    account: Account,
    setAccount: (newAccount:Account) => void,
    logout: () => void,
    liste: Lista[],
    aggiungiListaInLocale: (l: Lista) => void,
    rimuoviListaInLocale: (id: string) => void,
    modificaListaInLocale: (listaModificata: Lista) => void,
    oggettiPrecedenti: string[],
    aggiungiOggettoInLocale: (oggetto: string) => void,
    rimuoviOggettoInLocale: (oggetto: string) => void,
    rimuoviTuttiOggettiInLocale: () => void,
  ) {
    this.serverUrl = serverUrl;
    this.account = account;
    this.setAccount = setAccount;
    this.logout = logout;
    this.liste = liste;
    this.aggiungiListaInLocale = aggiungiListaInLocale;
    this.rimuoviListaInLocale = rimuoviListaInLocale;
    this.modificaListaInLocale = modificaListaInLocale;
    this.oggettiPrecedenti = oggettiPrecedenti;
    this.aggiungiOggettoInLocale = aggiungiOggettoInLocale;
    this.rimuoviOggettoInLocale = rimuoviOggettoInLocale;
    this.rimuoviTuttiOggettiInLocale = rimuoviTuttiOggettiInLocale;
  }
}

export default DatiApp;
