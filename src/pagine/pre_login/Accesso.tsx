import { FormEvent, useState } from "react";
import { useAppContext } from "../../context";
import Account from "../../classi/Account";

interface Props {
  cambiaSchermata: (id:number) => void;
}

const Accesso = ({cambiaSchermata}: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const datiApp = useAppContext();


  const accedi = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log(datiApp.serverUrl);
      const response = await fetch(`${datiApp.serverUrl}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("OK!, response = ", response);
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
    <div className="flexbox-verticale-100" >
      
      
    <form onSubmit={accedi} id="form-grigio">

      
      <label >
        <span>{"Email:\n"}</span>
        <br />
        <input type="text" value={email} className="input-text" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <br />
      <label >
        <span>{"Password:\n"}</span>
        <br />
        <input type="password" value={password} className="input-text" onChange={(e) => setPassword(e.target.value)} />
      </label>

      <div className="flexbox-orizzontale" id="pulsantiera-accesso">
        <button className="accesso-button" type="submit">Accedi</button>
        <button  className="accesso-button" onClick={() => cambiaSchermata(0)}>Indietro</button>
      </div>

    </form>


    </div>
  );
};

export default Accesso;
