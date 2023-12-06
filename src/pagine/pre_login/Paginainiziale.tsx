
interface Props {
  func: (id:number) => void;
}

const Paginainiziale = ({func}:Props) => {
  return (
    <div>
      <h1 id="titolo-paginainiziale">Pricepal</h1>
      <h4 id="sottotitolo-paginainiziale">Tieni traccia delle tue spese</h4>
      <div id="box-paginainiziale">
        <button onClick={() => {func(1)}} className="button-paginainiziale">Accedi</button>
        <button onClick={() => {func(2)}} className="button-paginainiziale">Registrati</button>
      </div>
      
    </div>
  )
}

export default Paginainiziale


/**/