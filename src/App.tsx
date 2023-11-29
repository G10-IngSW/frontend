import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import LayoutApp from './pagine/post_login/LayoutApp';
import Home from './pagine/post_login/Home';
import GestioneLista from './pagine/post_login/GestioneLista'
import PaginaNonTrovata from './pagine/PaginaNonTrovata';
import StoricoCarrelli from './pagine/post_login/StoricoCarrelli';
import PreLoginLayout from './pagine/pre_login/PreLoginLayout';



function App() {
  const [accountCollegato, setAccountCollegato] = useState<boolean>(false);

  const collegaAccount = () => {
    setAccountCollegato(true);
  }



  return (
    <>
      {accountCollegato ?
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutApp />}>
              <Route index element={<Home />} />
              <Route path="gestione-lista" element={<GestioneLista titolo="Titolo lista" />} />
              <Route path="storico-carrelli" element={<StoricoCarrelli />} />
              <Route path="storico-carrelli" element={<StoricoCarrelli />} />
              <Route path="*" element={<PaginaNonTrovata />} />
            </Route>
          </Routes>
        </BrowserRouter>
      :
        <PreLoginLayout func={collegaAccount}></PreLoginLayout>
      }
    </>
  );
}

export default App
