import Account from "./Account";
import Lista from "./Lista";

class DatiApp {
  serverUrl: string;
  account: Account;
  setAccount: (newAccount:Account) => void;
  logout: () => void;
  liste: Lista[];
  updateListe: () => void;

  constructor(
    serverUrl: string,
    account: Account,
    setAccount: (newAccount:Account) => void,
    logout: () => void,
    liste: Lista[],
    updateListe: () => void,
  ) {
    this.serverUrl = serverUrl;
    this.account = account;
    this.setAccount = setAccount;
    this.logout = logout;
    this.liste = liste;
    this.updateListe = updateListe;
  }
}

export default DatiApp;
