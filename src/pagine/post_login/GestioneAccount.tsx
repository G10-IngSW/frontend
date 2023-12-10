import { FormEvent, useState } from 'react';
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';

export const GestioneAccount = () => {

  const datiApp = useAppContext();
  const navigate = useNavigate();

  const [modificaNome, setModificaNome] = useState(false);
  const [modificaEmail, setModificaEmail] = useState(false);
  const [modificaPassword, setModificaPassword] = useState(false);

  const handleModificaNomeClick = () => {
    setModificaNome(true);
    setModificaEmail(false);
    setModificaPassword(false);
  };

  const handleModificaEmailClick = () => {
    setModificaNome(false);
    setModificaEmail(true);
    setModificaPassword(false);
  };

  const handleModificaPasswordClick = () => {
    setModificaNome(false);
    setModificaEmail(false);
    setModificaPassword(true);
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

  const logout = () => {
    datiApp.logout();
    navigate("/");
  }
  

  return (
    <div className="container-gestioneaccount">
      <button className='gestioneaccount' onClick={handleModificaNomeClick}>Cambia nome</button>
      <button className='gestioneaccount' onClick={handleModificaEmailClick}>Cambia email</button>
      <button className='gestioneaccount' onClick={handleModificaPasswordClick}>Cambia password</button>
      <button className='gestioneaccount' onClick={logout}>Logout</button>

      {modificaNome && <ModificaNomeForm onClose={handleCloseModificaNome} />}
      {modificaEmail && <ModificaEmailForm onClose={handleCloseModificaEmail}/>}
      {modificaPassword && <ModificaPasswordForm onClose={handleCloseModificaPassword}/>}

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
    <form onSubmit={handleSubmit}>
      <label>
        Nuovo Nome:
        <input type="text" value={nuovoNome} onChange={(e) => setNuovoNome(e.target.value)} />
      </label>
      <br />
      <label>
        Password di conferma:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Conferma Modifica</button>
      <br />
     <button type='button' onClick={onClose}>Chiudi</button>
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
    <form onSubmit={handleSubmit}>
      <label>
        Nuova Email:
        <input type="text" value={nuovaEmail} onChange={(e) => setNuovaEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password di conferma:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Conferma Modifica</button>
      <br />
     <button type='button' onClick={onClose}>Chiudi</button>
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
    <form onSubmit={handleSubmit}>
      <label>
        Nuova Password:
        <input type="password" value={nuovaPassword} onChange={(e) => setNuovaPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Password di conferma:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Conferma Modifica</button>
      <br />
     <button type='button' onClick={onClose}>Chiudi</button>
    </form>
  );
};



