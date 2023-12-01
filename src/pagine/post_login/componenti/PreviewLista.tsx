import Lista from "../../../classi/Lista";

interface Props {
  lista: Lista; 
} 

const PreviewLista = ({lista}: Props) => {
  return (
    <div className="preview-lista">
      {lista.nome} <br />
      {`${lista.oggetti.length} items`}
    </div>
  )
}

export default PreviewLista