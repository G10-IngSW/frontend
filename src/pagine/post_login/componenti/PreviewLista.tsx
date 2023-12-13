import { useNavigate } from "react-router-dom";
import Lista from "../../../classi/Lista";

interface Props {
  lista: Lista;
}

const PreviewLista = ({ lista }: Props) => {

  const navigate = useNavigate();

  function formattaData(data: Date): string {
    
    const data_tmp = new Date(data); // I hate typescript

    const giorno: number = data_tmp.getDate();
    const mese: number = data_tmp.getMonth() + 1;
    const anno: number = data_tmp.getFullYear();

    // Aggiungi zero iniziale se il giorno o il mese è inferiore a 10
    const giornoFormattato: string = giorno < 10 ? `0${giorno}` : `${giorno}`;
    const meseFormattato: string = mese < 10 ? `0${mese}` : `${mese}`;

    // Formatta la data come "giorno/mese/anno"
    const dataFormattata: string = `${giornoFormattato}/${meseFormattato}/${anno}`;

    return dataFormattata;
  }

  return (
    <div
      className="preview-lista"
      onClick={() => {
        navigate(`/gestione-lista/${lista.id}`, { replace: true });
      }}
    >
      <span>
        {lista.titolo} 
        <br /> 
        {lista.oggetti.length} 
        <span className="span-grey-text"> oggetti </span>
      </span>
      <span className="span-grey-text">{formattaData(lista.dataUltimaModifica)}</span>
    </div>
  );
};

export default PreviewLista;
