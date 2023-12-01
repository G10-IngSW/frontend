import PreviewLista from "./componenti/PreviewLista"
import { useState} from "react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
          
      <h1>Liste recenti</h1>
      <div>
        <PreviewLista titolo="lista1" numberOfItems={12}></PreviewLista>
        <PreviewLista titolo="lista2" numberOfItems={7}></PreviewLista>
        <PreviewLista titolo="lista3" numberOfItems={182}></PreviewLista>
      </div>
    
          <ul>
            <li>
              <Link to="/gestione-lista" className="li-navbar-button" id="navbar-gestione-lista-button">
              +
              </Link>
            </li>
          </ul>

    </>
  )
}

/* <Link to="/gestione-lista" className="li-navbar-button" id="navbar-gestione-lista-button">
              +
            </Link>*/

export default Home