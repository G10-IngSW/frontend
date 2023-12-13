import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import LayoutApp from './pagine/post_login/LayoutApp';
import Home from './pagine/post_login/Home';
import GestioneLista from './pagine/post_login/GestioneLista'
import PaginaNonTrovata from './pagine/PaginaNonTrovata';
import PreLoginLayout from './pagine/pre_login/PreLoginLayout';
import Liste from './pagine/post_login/Liste';
import Account from './classi/Account';
import Lista from './classi/Lista';
import { AppContext } from './context';
import DatiApp from './classi/DatiApp';
import { GestioneAccount } from './pagine/post_login/GestioneAccount';




function App() {

  const nullAccount = new Account("id", "nome", "email");

  const [account, setAccount] = useState<Account>(nullAccount);
  const [autenticato, setAutenticato] = useState<boolean>(false);
  const [liste, setListe] = useState<Lista[]>([]);
  const [oggettiPrecedenti, setOggettiPrecedenti] = useState<string[]>([]);


  
  const setAccountAndUpdateLists = (newAccount: Account) => {
    setAccount(newAccount);
    setAutenticato(true);
    caricaListe(newAccount.id);
    caricaOggettiPrecedenti(newAccount.id);
  }
  
  
  
  // serve il parametro perchè setAccount non è immediata, non possiamo leggere account.id
  const caricaListe = async (accountId: string) => { 
    try {
      const response = await fetch(`${datiApp.serverUrl}/liste/${accountId}`);
      if (response.ok) {
        console.log("ricevute le liste dal DB");
        const result = await response.json();
        console.log("result: ", result);
        let listeCaricate: Lista[] = result.liste.map(
          (item: {_id:string, titolo:string, oggetti:string[], idAccount:string, dataUltimaModifica:Date}) => 
          (new Lista(item._id, item.titolo, item.oggetti, item.dataUltimaModifica))
          );
          console.log("listeCaricate: ", listeCaricate);
          
          setListe(listeCaricate);
          
        } else {
          console.log("risposta non ok in caricaListe: ", response);
          setListe([]);
        }
      } catch (error) {
        console.log(error);
        setListe([]);
      }
    }
    
    const updateListe = async () => {
      await caricaListe(account.id);
    }

    // api per caricare gli oggetti precedentemente inseriti
    const caricaOggettiPrecedenti = async (accountId: string) => {
      const response = await fetch(`${datiApp.serverUrl}/oggetti/${accountId}`);
      console.log(response);
      if (response.ok) {
        console.log("ricevuti gli oggetti precedenti dal DB");
        const result = await response.json();
        console.log("result = ", result);
        if (result.oggetti.length == 0) {
          await setOggettiPrecedenti([]);
        } else {
          await setOggettiPrecedenti(result.oggetti[0].oggetti);
        }
      }
    }

    const updateOggettiPrecedenti = async () => {
      await caricaOggettiPrecedenti(account.id);
    }

    const logout = () => {
      setAutenticato(false);
    }

    const datiApp: DatiApp = new DatiApp(
      "https://fuzzy-erin-drawers.cyclic.app", 
      account, 
      setAccountAndUpdateLists, 
      logout, 
      liste, 
      updateListe, 
      oggettiPrecedenti, 
      updateOggettiPrecedenti
    );
    
    return (
      <AppContext.Provider value = {datiApp}>
      {autenticato ?
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutApp />}>
              <Route index element={<Home />} />
              <Route path="gestione-lista/:idListaUrl" element={<GestioneLista/>} />
              <Route path="liste" element={<Liste />} />
              <Route path="gestione-account" element={<GestioneAccount />}/>
              <Route path="*" element={<PaginaNonTrovata />} />
            </Route>
          </Routes>
        </BrowserRouter>
      :
        <PreLoginLayout />
      }
    </AppContext.Provider>
  );
}

export default App
