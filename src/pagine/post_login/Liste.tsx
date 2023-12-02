import { useState } from "react";
import Lista from "../../classi/Lista";
import PreviewLista from "./componenti/PreviewLista";
import CreaLista from "./componenti/CreaLista";

const Liste = () => {

  const [liste, setListe] = useState<Lista[]>([
    new Lista("L1", "lista1", ["lol","a","a"]),
    new Lista("L2", "lista2", ["lol","a","a","a","a"]),
    new Lista("L3", "lista3", ["lol","a","a","a","a","a","a","a","a"]),
  ]);


  return (
    <div>
      Liste

      <ul>

        <li key={-1}>
          <CreaLista />
        </li>

        {liste.map((item:Lista, index:number) => (
          <li key={index}>
            <PreviewLista lista={item} />
          </li>
        ))}

        
      </ul>

    </div>
  )
}

export default Liste