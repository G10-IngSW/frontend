import { Outlet, Link } from "react-router-dom";

const LayoutApp = () => {
  return (
    <>
      <nav>
        <ul className="ul-navbar">
          <li className="li-navbar">
            <Link to="/">Home</Link>
          </li>
          <li className="li-navbar">
            <Link to="/gestione-lista">Gestione lista</Link>
          </li>
          <li className="li-navbar">
            <Link to="/storico-carrelli">Storico carrelli</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default LayoutApp;