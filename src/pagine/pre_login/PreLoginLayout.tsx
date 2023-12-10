import { useState } from 'react'
import Accesso from './Accesso';
import Paginainiziale from './Paginainiziale';
import Registrazione from './Registrazione';


const PreLoginLayout = () => {

  const [idSchermata, setIdSchermata] = useState<number>(0);

  return (
    <> 
      {(() => {
        switch (idSchermata) {
          case 0:
            return <Paginainiziale cambiaSchermata={setIdSchermata} />
          case 1:
            return <Accesso cambiaSchermata={setIdSchermata}/>
          case 2:
            return <Registrazione cambiaSchermata={setIdSchermata} />
          default:
            return null
        }
      })()}
    </>
  )

}

export default PreLoginLayout