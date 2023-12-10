import Lista from "../../classi/Lista"
import PreviewLista from "./componenti/PreviewLista"
import CreaListaButton from "./componenti/CreaListaButton";
import { useAppContext } from "../../context";



const Home = () => {

  const datiApp = useAppContext();
  //most sane javascript logic NON TOCCARE
  const listeRecenti = datiApp.liste
  .sort((a : Lista, b : Lista) => new Date(b.dataUltimaModifica).getTime() - new Date(a.dataUltimaModifica).getTime())
  .slice(0, 3);

  return (
    <>
          
      <h1 id="liste-recenti-h1">Liste recenti</h1>
      
      <ul>

        {listeRecenti.map((item:Lista, index:number) => (
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