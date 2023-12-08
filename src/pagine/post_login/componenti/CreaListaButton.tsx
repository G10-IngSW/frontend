import { useNavigate } from "react-router-dom";


const CreaListaButton = () => {

  const navigate = useNavigate();

  const creaLista = () => {
    navigate(`/gestione-lista/nuova_lista`, { replace: true });
  }

  
  return (
    <div className="preview-lista" onClick={creaLista}>
      <p className="crea-lista-plus">
        +
      </p>
    </div>
  )
}

export default CreaListaButton