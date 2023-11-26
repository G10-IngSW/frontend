import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutApp from './pagine/LayoutApp';
import Home from './pagine/Home';
import GestioneLista from './pagine/GestioneLista'
import PaginaNonTrovata from './pagine/PaginaNonTrovata';
import StoricoCarrelli from './pagine/StoricoCarrelli';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutApp />}>
          <Route index element={<Home />} />
          <Route path="gestione-lista" element={<GestioneLista titolo="Titolo lista" />} />
          <Route path="storico-carrelli" element={<StoricoCarrelli />} />
          <Route path="*" element={<PaginaNonTrovata />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
