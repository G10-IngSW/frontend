import { Outlet, Link, useNavigate } from "react-router-dom";
import Header from "./componenti/Header";
import DatiApp from "../../classi/DatiApp";
import { useAppContext } from "../../context";

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
        <NavbarButton route="/">Home</NavbarButton>
        </li>

        <li className="li-navbar">
          <NavbarButton route="/liste">Liste</NavbarButton>
        </li>


      </ul>
    </nav>
  );
};

interface Props {
  route: string;
  children: string;
}

const NavbarButton = ({route, children}: Props) => {

  const datiApp = useAppContext();
  const navigate = useNavigate();

  const changeRoute = () => {
    // Se si vuole evitare che si possa cambiare schermata quando si sta modificando
    // una lista e ci sono cambiamenti non salvati, inserire la logica qui
    navigate(route);
  }

  return (
    <button onClick={changeRoute} className="li-navbar-button">
      {children}
    </button>
  );
}
