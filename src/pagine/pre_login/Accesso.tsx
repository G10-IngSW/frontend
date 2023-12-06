import { useState } from "react";
import { useAppContext } from "../../context";


const Accesso = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const datiApp = useAppContext();

  const accedi = async () => {
    try {
      const response = await fetch(`${datiApp.serverUrl}/utenti/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        console.log("OK!, response = ", response);
      } else {
        console.log("NOT OK!, response = ", response);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (




    
    <div>

      Login<br /><br />

      Email<br />
      <input 
        type="text" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />
      Password<br />
      <input 
        type="text" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />
      <button onClick={accedi}>Accedi</button>

    </div>
  )
}

export default Accesso