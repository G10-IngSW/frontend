import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LayoutApp = () => {

  const [selectedButton, setSelectedButton] = useState<number>(0);

  const getStyle = (idButton: number) => {
    
    if (idButton === selectedButton) {
      return "navbar-button-selected";
    } else {
      return "navbar-button";
    }
  }

  return (
    <>
      <Header setSelectedButton={setSelectedButton} getStyle={getStyle}/>
      <NavBar setSelectedButton={setSelectedButton} getStyle={getStyle} />

      <Outlet />
    </>
  );
};

export default LayoutApp;

interface Props {
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  getStyle: (idButton: number) => string;
};
  

const NavBar = ({setSelectedButton,getStyle} : Props) => {
  

  
  return (
    
    <nav>
      <ul className="ul-navbar">
        <li className="li-navbar">
        <NavbarButton route="/" idButton={0} cssClass={getStyle(0)} changeSelectedButton = {setSelectedButton}>Home</NavbarButton>
        </li>

        <li className="li-navbar">
          <NavbarButton route="/liste" idButton={1} cssClass={getStyle(1)} changeSelectedButton = {setSelectedButton}>Liste</NavbarButton>
        </li>


      </ul>
    </nav>
  );
};

interface NavbarButtonProps {
  route: string;
  children: string;
  idButton: number;
  cssClass: string;
  changeSelectedButton: React.Dispatch<React.SetStateAction<number>>;
}

const NavbarButton = ({route, children,idButton,cssClass,changeSelectedButton}: NavbarButtonProps) => {
  const navigate = useNavigate();

  const changeRoute = () => {
    
    changeSelectedButton(idButton);

    navigate(route);
  }

  return (
    <button onClick={changeRoute} className={cssClass}>
      {children}
    </button>
  );
}



const Header = ({setSelectedButton} : Props) => {

  const datiApp = useAppContext();

  const navigate = useNavigate();

  const openGestioneAccount = () => {
    setSelectedButton(-1);
    navigate('/gestione-account', {replace : true});
  }


   
  return (
    <div id='disposizione-header'>
      <h2 id='Pricepal-title'>Pricepal</h2>
      <div id='disposizione-accountbutton' onClick={openGestioneAccount} >
        <h4>{datiApp.account.nome}</h4>
        <FontAwesomeIcon icon={faUser} id="img-IconaUtente"/>
      </div>
    </div>
  )
}


