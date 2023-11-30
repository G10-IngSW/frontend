import { useState } from "react";

interface Props {
  func: () => void;
}

const Accesso = ({func}: Props) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


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
      <button onClick={func}>Accedi</button>

    </div>
  )
}

export default Accesso