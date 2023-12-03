import { Outlet, Link } from "react-router-dom";

const LayoutApp = () => {
  return (
    <>
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
