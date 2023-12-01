import { useState } from "react";
import Lista from "../../classi/Lista"
import PreviewLista from "./componenti/PreviewLista"
import { Link } from "react-router-dom"

const Home = () => {

  const [ultimeListe, setUltimeListe] = useState<Lista[]>([
    new Lista("lista1", ["lol","a","a"]),
    new Lista("lista2", ["lol","a","a","a","a"]),
    new Lista("lista3", ["lol","a","a","a","a","a","a","a","a"]),
  ]);


  return (
    <>
          

      <h1>Liste recenti</h1>
      
    
      
    
      <ul>

        {ultimeListe.map((item:Lista, index:number) => (
          <li key={index}><PreviewLista lista={item}></PreviewLista></li>
        ))}

        <li key={-1}>
          <div className="preview-lista">
            <Link to="/gestione-lista" className="liste-recenti-plus">
              +
            </Link>
          </div>
        </li>

      </ul>

    </>
  )
}


export default Home