import { useState } from "react";
import { useAppContext } from "../../context";
import Account from "../../classi/Account";

const Accesso = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const datiApp = useAppContext();

  const accedi = async () => {
    try {
      console.log(datiApp.serverUrl);
      const response = await fetch(`${datiApp.serverUrl}/utenti/login`, {
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
        const resultObject = result.utente as {
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
      Login
      <br />
      <br />
      Email
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      Password
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={accedi}>Accedi</button>
    </div>
  );
};

export default Accesso;
