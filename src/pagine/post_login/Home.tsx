import Lista from "../../classi/Lista"
import PreviewLista from "./componenti/PreviewLista"
import CreaListaButton from "./componenti/CreaListaButton";
import { useAppContext } from "../../context";



const Home = () => {

  const datiApp = useAppContext();
  

  return (
    <>
          
      <h1>Liste recenti</h1>
      
      <ul>

        {datiApp.liste.map((item:Lista, index:number) => (
          <li key={index}>
            <PreviewLista lista={item} />
          </li>
        ))}

        <li key={-1}>
          <CreaListaButton />
        </li>

      </ul>

    </>
  )
}


export default Home



// `/gestione-lista/${"nuova_lista"}`