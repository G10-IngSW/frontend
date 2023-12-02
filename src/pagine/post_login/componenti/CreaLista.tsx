import { useNavigate } from "react-router-dom";

const CreaLista = () => {

  const navigate = useNavigate();

  const creaLista = () => {
    // chiamata alle API per creare la lista sul DB
    // chiamata alle API per prendere l'id della lista creata
    let id_nuova_lista = "nuova_lista"; // placeholder
    navigate(`/gestione-lista/${id_nuova_lista}`, { replace: true });
  };

  return (
    <div className="preview-lista" onClick={creaLista}>
      <p className="crea-lista-plus">
        +
      </p>
    </div>
  )
}

export default CreaLista