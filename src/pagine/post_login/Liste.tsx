import Lista from "../../classi/Lista";
import PreviewLista from "./componenti/PreviewLista";
import CreaLista from "./componenti/CreaListaButton";
import { useAppContext } from "../../context";

const Liste = () => {

  const datiApp = useAppContext();

  return (
    <div>

      <ul>

        <li key={-1}>
          <CreaLista />
        </li>

        {datiApp.liste.map((item:Lista, index:number) => (
          <li key={index}>
            <PreviewLista lista={item} />
          </li>
        ))}

        
      </ul>

    </div>
  )
}

export default Liste