import { Outlet, Link } from "react-router-dom";

const LayoutApp = () => {
  return (
    <>
      <nav>
        <ul className="ul-navbar">

          <li className="li-navbar">
            <Link to="/" className="li-navbar-button" id="navbar-home-button">
              Home
            </Link>
          </li>

          <li className="li-navbar">
            <Link to="/gestione-lista" className="li-navbar-button" id="navbar-gestione-lista-button">
              Gestione lista
            </Link>
          </li>

          <li className="li-navbar">
            <Link to="/storico-carrelli" className="li-navbar-button" id="navbar-storico-carrelli-button">
              Storico Carrelli
            </Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default LayoutApp;