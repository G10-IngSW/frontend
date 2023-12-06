import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context';


const Header = () => {
   
  return (
    <div id='disposizione-header'>
      <h2 id='Pricepal-title'>Pricepal</h2>
      <AccountButton /> 
    </div>
  )
}

const AccountButton = () => {

  const datiApp = useAppContext();

  const navigate = useNavigate();

  const openGestioneAccount = () => {
    navigate('/gestione-account', {replace : true});
  }

  return (
    <div id='disposizione-accountbutton' onClick={openGestioneAccount} >
      <h4>{datiApp.account.nome}</h4>
      <FontAwesomeIcon icon={faUser} id="img-IconaUtente"/>
    </div>
  )
}

export default Header;

// style={{color: "#9c9ba0",}}