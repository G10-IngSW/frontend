import { FormEvent, useState } from 'react';
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';

export const GestioneAccount = () => {

  const datiApp = useAppContext();
  const navigate = useNavigate();

  const [modificaNome, setModificaNome] = useState(false);
  const [modificaEmail, setModificaEmail] = useState(false);
  const [modificaPassword, setModificaPassword] = useState(false);
  const [eliminaAccount, setEliminaAccount] = useState(false);
  

  const handleModificaNomeClick = () => {
    setModificaNome(true);
    setModificaEmail(false);
    setModificaPassword(false);
    setEliminaAccount(false);
  };

  const handleModificaEmailClick = () => {
    setModificaNome(false);
    setModificaEmail(true);
    setModificaPassword(false);
    setEliminaAccount(false);
    
  };

  const handleModificaPasswordClick = () => {
    setModificaNome(false);
    setModificaEmail(false);
    setModificaPassword(true);
    setEliminaAccount(false);
    
  };

  const handleEliminaAccountClick = () => {
    setModificaNome(false);
    setModificaEmail(false);
    setModificaPassword(false);
    setEliminaAccount(true);
  };


  const handleCloseModificaNome = () => {
    setModificaNome(false);
  };

  const handleCloseModificaEmail = () => {
    setModificaEmail(false);
  };

  const handleCloseModificaPassword = () => {
    setModificaPassword(false);
  };

  const handleCloseEliminaAccount = () => {
    setEliminaAccount(false);
  };

  
  const logout = () => {
    datiApp.logout();
    navigate("/");
  }
  

  return (
    <div id={modificaNome || modificaEmail || modificaPassword || eliminaAccount ? 'disposizione-orizzontale-gestioneaccount' : 'disposizione-centrale'}>
      <div className="container-gestioneaccount">
        <button className={modificaNome ? 'gestione-account-attivo' : 'gestioneaccount'} onClick={handleModificaNomeClick}>Cambia nome</button>
        <button className={modificaEmail? 'gestione-account-attivo' : 'gestioneaccount'} onClick={handleModificaEmailClick}>Cambia email</button>
        <button className={modificaPassword ? 'gestione-account-attivo' : 'gestioneaccount'} onClick={handleModificaPasswordClick}>Cambia password</button>
        <button className={eliminaAccount ? 'gestione-account-attivo' : 'gestioneaccount'} onClick={handleEliminaAccountClick}>Elimina Account</button>
        <button className='gestioneaccount' onClick={logout}>Logout</button>
      </div>

      
        {modificaNome && <ModificaNomeForm onClose={handleCloseModificaNome} />}
        {modificaEmail && <ModificaEmailForm onClose={handleCloseModificaEmail}/>}
        {modificaPassword && <ModificaPasswordForm onClose={handleCloseModificaPassword}/>}
        {eliminaAccount && <EliminaAccountForm onClose={handleCloseEliminaAccount}/>}
        
      
    </div>

  )
}

interface Props { 
  onClose: () => void;
}

const ModificaNomeForm = ({onClose}: Props) => {
  const [nuovoNome, setNuovoNome] = useState('');
  const [password, setPassword] = useState('');
  const datiApp = useAppContext();

  const ModificaNome = async () => {
    const idUtente = datiApp.account.id;
    try {
      const response = await fetch(`${datiApp.serverUrl}/account/modifica/${idUtente}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nuovoNome,
          vecchiaPassword: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Modifica effettuata con successo:', data);
        datiApp.account.nome = nuovoNome;
        datiApp.setAccount(datiApp.account); 
      } else {
        const errorData = await response.json();
        console.error('Errore durante la modifica:', errorData.error);
      }
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    }
  };

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();

    ModificaNome();

    setNuovoNome('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className='form-gestioneaccount'>

      
      <label>
        Nuovo Nome:
        <br />
        <input type="text" className='input-text' value={nuovoNome} onChange={(e) => setNuovoNome(e.target.value)} />
      </label>
      <br />
      <br />
      
      <label >
        Password di conferma:
        <br />
        <input type="password" className='input-text' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <br />
      

      <div className='bottoniera-form'>
        <button type="submit" className='button-form'>Conferma Modifica</button>
        <button type='button' className='button-form' onClick={onClose}>Chiudi</button>
      </div>
      
    </form>
  );
};



const ModificaEmailForm = ({onClose}:Props) => {
  const [nuovaEmail, setNuovaEmail] = useState('');
  const [password, setPassword] = useState('');
  const datiApp = useAppContext();

  const ModificaEmail = async () => {
    try {
      const response = await fetch(`${datiApp.serverUrl}/account/modifica/${datiApp.account.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: nuovaEmail,
          vecchiaPassword: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Modifica effettuata con successo:', data);
        datiApp.account.email = nuovaEmail;
        datiApp.setAccount(datiApp.account);
      } else {
        const errorData = await response.json();
        console.error('Errore durante la modifica:', errorData.error);
      }
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    }
  };

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();

    ModificaEmail();

    setNuovaEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className='form-gestioneaccount'>
      
      <label>
        Nuova Email:
        <br />
        <input type="text" className='input-text' value={nuovaEmail} onChange={(e) => setNuovaEmail(e.target.value)} />
      </label>
      <br />
      <br />
      <label>
        Password di conferma:
        <br />
        <input type="password" className='input-text' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
    
      <br />
   
      <div className='bottoniera-form'>
      <button type="submit" className='button-form'>Conferma Modifica</button>
      <button type='button' className='button-form' onClick={onClose}>Chiudi</button>
      </div>
    </form>
  );
};

const ModificaPasswordForm = ({onClose}: Props) => {
  const [nuovaPassword, setNuovaPassword] = useState('');
  const [password, setPassword] = useState('');
  const datiApp = useAppContext();

  const ModificaPassword = async () => {
    try {
      const response = await fetch(`${datiApp.serverUrl}/account/modifica/${datiApp.account.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nuovaPassword: nuovaPassword,
          vecchiaPassword: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Modifica effettuata con successo:', data);
      } else {
        const errorData = await response.json();
        console.error('Errore durante la modifica:', errorData.error);
      }
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    }
  };



  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();

    ModificaPassword();

    setNuovaPassword('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className='form-gestioneaccount'>
      
      <label >
        Nuova Password:
        <br />
        <input type="password"  className='input-text' value={nuovaPassword} onChange={(e) => setNuovaPassword(e.target.value)} />
      </label>
      <br />
      <br />
      
      <label >
        Password di conferma:
        <br />
        <input type="password" className='input-text' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      
      <br />
      
      <div className='bottoniera-form'>
      <button type="submit" className='button-form'>Conferma Modifica</button>
      <button type='button' className='button-form' onClick={onClose}>Chiudi</button>
      </div>
    </form>
  );
};




const EliminaAccountForm = ({onClose}: Props) => {
  const [password, setPassword] = useState('');
  const datiApp = useAppContext();
  const navigate = useNavigate();

  const EliminaAccount = async () => {
    const idUtente = datiApp.account.id;
    try {
      const response = await fetch(`${datiApp.serverUrl}/account/elimina/${idUtente}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        datiApp.logout();
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error('Errore durante l\'eliminazione:', errorData.error);
      }
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    }
  };

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();

    EliminaAccount();
  };

  return (
    <form onSubmit={handleSubmit} className='form-gestioneaccount'>
      
      <p id ='testo-eliminazione-account'>Sei proprio sicuro di voler eliminare il tuo account?</p>
      <br />
      <label >
        Password di conferma:
        <br />
        <input type="password" className='input-text' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      

      <br />
      
      
      <div className='bottoniera-form'>
        <button type="submit" className='button-form'>Conferma Eliminazione</button>
        <button type='button' className='button-form' onClick={onClose}>Chiudi</button>
      </div>
    </form>
  );
};


