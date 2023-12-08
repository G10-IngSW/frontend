import { useNavigate } from "react-router-dom";
import Lista from "../../../classi/Lista";

interface Props {
  lista: Lista;
}

const PreviewLista = ({ lista }: Props) => {

  const navigate = useNavigate();

  return (
    <div
      className="preview-lista"
      onClick={() => {
        navigate(`/gestione-lista/${lista.id}`, { replace: true });
      }}
    >
      {lista.titolo} <br />
      {`${lista.oggetti.length} items`}
    </div>
  );
};

export default PreviewLista;
