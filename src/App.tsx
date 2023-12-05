import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import LayoutApp from './pagine/post_login/LayoutApp';
import Home from './pagine/post_login/Home';
import GestioneLista from './pagine/post_login/GestioneLista'
import PaginaNonTrovata from './pagine/PaginaNonTrovata';
import StoricoCarrelli from './pagine/post_login/StoricoCarrelli';
import PreLoginLayout from './pagine/pre_login/PreLoginLayout';
import Liste from './pagine/post_login/Liste';
import Account from './classi/Account';
import Lista from './classi/Lista';
import { AppContext } from './context';
import DatiApp from './classi/DatiApp';



function App() {

  const idMario = "656a474da0cc5abf3cccd739";

  const accountInCaricamento: Account = new Account("tmp_id", "Caricamento...", "tmp_email");

  const [account, setAccount] = useState<Account>(accountInCaricamento);
  const [liste, setListe] = useState<Lista[]>([]);

  const datiApp: DatiApp = new DatiApp("http://localhost:3000", account, setAccount, liste, setListe);


  const collegaAccount = () => {
    setAccount(new Account(idMario, "MarioFinto", "email@finta.it"));
    caricaListe(idMario);
    //creaLista(idMario);
  }

  // serve il parametro perchè setAccount non è immediata, non possiamo leggere account.id
  const caricaListe = async (accountId: string) => { 
    try {
      const response = await fetch(`${datiApp.serverUrl}/liste/?idUtente=${accountId}`);
      if (response.ok) {
        console.log("ricevute le liste dal DB");
        const result = await response.json();

        // TODO: FIX THE DATES!!! -------------------------------------------------------------------------------------
        let listeCaricate: Lista[] = result.liste.map(
          (item: {_id:string, titolo:string, elementi:string[], data:any}) => 
          (new Lista(item._id, item.titolo, item.elementi, new Date(item.data)))
        );

        //const resultObject = result as { message: string, liste: Lista[] };
        setListe(listeCaricate);
        
      } else {
        console.log("risposta non ok in caricaListe: ", response);
      }
    } catch (error) {
      console.log(error);
    }
  }


 

  return (
    <AppContext.Provider value = {datiApp}>
      {account.id != "tmp_id" ?
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutApp />}>
              <Route index element={<Home />} />
              <Route path="gestione-lista/:idlista" element={<GestioneLista/>} />
              <Route path="liste" element={<Liste />} />
              <Route path="storico-carrelli" element={<StoricoCarrelli />} />
              <Route path="*" element={<PaginaNonTrovata />} />
            </Route>
          </Routes>
        </BrowserRouter>
      :
        <PreLoginLayout func={collegaAccount}></PreLoginLayout>
      }
    </AppContext.Provider>
  );
}

export default App
