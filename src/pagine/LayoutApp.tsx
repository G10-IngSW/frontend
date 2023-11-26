import { Outlet, Link } from "react-router-dom";

const LayoutApp = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gestione-lista">Gestione lista</Link>
          </li>
          <li>
            <Link to="/storico-carrelli">Storico carrelli</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default LayoutApp;