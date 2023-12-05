import React from 'react'
import { useNavigate } from 'react-router-dom';


type Props = {
  username : string;
}

const Header = (props: Props) => {
   
  return (
    <div id='disposizione-header'>
      <h2 id='Pricepal-title'>Pricepal</h2>
      <AccountButton username='Mario'/> 
    </div>
  )
}

const AccountButton = ({username} : Props) => {

  const navigate = useNavigate();

  const openGestioneAccount = () => {
    navigate('/gestione-account',{replace : true});
  }

  return (
    <div id='disposizione-accountbutton' onClick={openGestioneAccount}>
      <h4>{username}</h4>
      <img src="C:\Users\andre\Git\frontend\src\assets\IconaUtente.png" alt="icona-utente" id='img-IconaUtente'/>
    </div>
  )
}

export default Header;