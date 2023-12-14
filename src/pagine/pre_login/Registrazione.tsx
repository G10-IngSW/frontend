import { FormEvent, useState } from "react";
import { useAppContext } from "../../context";
import Account from "../../classi/Account";

interface Props {
  cambiaSchermata: (id:number) => void;
}

const CreazioneAccount = ({cambiaSchermata}: Props) => {

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ripetiPassword, setRipetiPassword] = useState<string>("");

  const datiApp = useAppContext();

  const creaAccount = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== ripetiPassword) {
      window.alert("Errore: le password non coincidono!");
      setPassword("");
      setRipetiPassword("");
      return;
    }


    try {
      const response = await fetch(`${datiApp.serverUrl}/account/registra`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Account creato!, response = ", response);
        const result = await response.json();
        console.log("result: ", result);
        const resultObject = result.account as {
          _id: string;
          nome: string;
          email: string;
          password: string;
        };
        const resultAccount = new Account(
          resultObject._id,
          resultObject.nome,
          resultObject.email
        );
        datiApp.setAccount(resultAccount);
      } else {
        console.log("NOT OK!, response = ", response);
      }
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <div>
      <button onClick={() => cambiaSchermata(0)}>indietro</button>
      <br /> <br />

      Login<br /><br />

      Email<br />
      <input 
        type="text" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      Username<br />
      <input 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      Password<br />
      <input 
        type="text" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      Ripeti password<br />
      <input 
        type="text" 
        value={ripetiPassword}
        onChange={(e) => setRipetiPassword(e.target.value)}
      />

      <br /><br />
      <button onClick={creaAccount}>Crea account</button>

    </div>
  )
}

export default CreazioneAccount