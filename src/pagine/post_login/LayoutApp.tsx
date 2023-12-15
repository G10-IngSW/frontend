import { Outlet, Link, useNavigate } from "react-router-dom";
import Header from "./componenti/Header";
import DatiApp from "../../classi/DatiApp";
import { useAppContext } from "../../context";
import { useState } from "react";

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
        <NavbarButton route="/" idButton="0">Home</NavbarButton>
        </li>

        <li className="li-navbar">
          <NavbarButton route="/liste" idButton="1">Liste</NavbarButton>
        </li>


      </ul>
    </nav>
  );
};

interface Props {
  route: string;
  children: string;
  idButton: string;
}

const NavbarButton = ({route, children,idButton}: Props) => {

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
