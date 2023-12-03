import { useState } from "react";
import Lista from "../../classi/Lista"
import PreviewLista from "./componenti/PreviewLista"
import CreaLista from "./componenti/CreaLista";

const Home = () => {

  const [ultimeListe, setUltimeListe] = useState<Lista[]>([
    new Lista("L1", "lista1", ["lol","a","a"]),
    new Lista("L2", "lista2", ["lol","a","a","a","a"]),
    new Lista("L3", "lista3", ["lol","a","a","a","a","a","a","a","a"]),
  ]);
  

  return (
    <>
          
      <h1>Liste recenti</h1>
      
      <ul>

        {ultimeListe.map((item:Lista, index:number) => (
          <li key={index}>
            <PreviewLista lista={item} />
          </li>
        ))}

        <li key={-1}>
          <CreaLista />
        </li>

      </ul>

    </>
  )
}


export default Home



// `/gestione-lista/${"nuova_lista"}`