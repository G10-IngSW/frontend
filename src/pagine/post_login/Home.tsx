import { useState} from "react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
          <h1>Liste recenti</h1>
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