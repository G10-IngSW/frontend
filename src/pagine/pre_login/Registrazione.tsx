import { useState } from "react";

interface Props {
  cambiaSchermata: (id:number) => void;
}

const CreazioneAccount = ({cambiaSchermata}: Props) => {

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      <button onClick={() => {console.log("Questo pulsante non fa niente!")}}>Crea account</button>

    </div>
  )
}

export default CreazioneAccount