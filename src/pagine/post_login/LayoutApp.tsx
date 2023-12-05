import { Outlet, Link } from "react-router-dom";
import Header from "./componenti/Header";

const LayoutApp = () => {
  return (
    <>
      <Header/>
      <NavBar />

      <Outlet />
    </>
  );
};

export default LayoutApp;

const NavBar = () => {
  return (
    <nav>
      <ul className="ul-navbar">
        <li className="li-navbar">
          <Link to="/" className="li-navbar-button">
            Home
          </Link>
        </li>

        <li className="li-navbar">
          <Link to="/liste" className="li-navbar-button">
            Liste
          </Link>
        </li>

        <li className="li-navbar">
          <Link to="/storico-carrelli" className="li-navbar-button">
            Storico Carrelli
          </Link>
        </li>
      </ul>
    </nav>
  );
};
