import { useState } from 'react'
import Accesso from './Accesso';
import Paginainiziale from './Paginainiziale';
import Registrazione from './Registrazione';

interface Props {
  func: () => void;
}

const PreLoginLayout = ({func}:Props) => {

  const [idSchermata, setIdSchermata] = useState<number>(0);

  return (
    <> 
      {(() => {
        switch (idSchermata) {
          case 0:
            return <Paginainiziale func={setIdSchermata} />
          case 1:
            return <Accesso func={func} />
          case 2:
            return <Registrazione func={func} />
          default:
            return null
        }
      })()}
    </>
  )

}

export default PreLoginLayout