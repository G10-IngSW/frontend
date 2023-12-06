import Account from "./Account";
import Lista from "./Lista";

class DatiApp {
  serverUrl: string;
  account: Account;
  setAccount: (newAccount:Account) => void;
  liste: Lista[];
  setListe: React.Dispatch<React.SetStateAction<Lista[]>>;

  constructor(
    serverUrl: string,
    account: Account,
    setAccount: (newAccount:Account) => void,
    liste: Lista[],
    setListe: React.Dispatch<React.SetStateAction<Lista[]>>
  ) {
    this.serverUrl = serverUrl;
    this.account = account;
    this.setAccount = setAccount;
    this.liste = liste;
    this.setListe = setListe;
  }
}

export default DatiApp;
