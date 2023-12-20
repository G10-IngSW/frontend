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
    <div className="flexbox-verticale-100">
     

      <form onSubmit={creaAccount}>
        <label>
          <span>{"Email:\n"}</span>
          <br />
          <input type="text" value={email} className="input-text" onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <br />
        <br />
        <label>
          <span>{"Username:\n"}</span>
          <br />
          <input type="text" value={username} className="input-text" onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <br />
        <br />
        <label>
          <span>{"Password:\n"}</span>
          <br />
          <input type="password" value={password} className="input-text" onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <br />
        <br />
        <label>
          <span>{"Conferma Password:\n"}</span>
          <br />
          <input type="password" value={ripetiPassword} className="input-text" onChange={(e) => setRipetiPassword(e.target.value)}/>
        </label>
        <br />
        <br />
        <div className="flexbox-orizzontale" id="pulsantiera-accesso">
          <button className="accesso-button" type="submit">Crea account</button>
          <button className="accesso-button" onClick={() => cambiaSchermata(0)}>indietro</button>
        </div>
      </form>

      
      

    </div>
  )
}

export default CreazioneAccount