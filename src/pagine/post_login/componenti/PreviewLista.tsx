
interface Props {
  titolo: string;
  numberOfItems: number;  
} 

const PreviewLista = ({titolo, numberOfItems}: Props) => {
  return (
    <div className="preview-lista">
      {titolo} <br />
      {`${numberOfItems} items`}
    </div>
  )
}

export default PreviewLista