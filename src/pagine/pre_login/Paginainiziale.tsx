
interface Props {
  cambiaSchermata: (id:number) => void;
}

const Paginainiziale = ({cambiaSchermata}:Props) => {


  return (
    <div className="flexbox-verticale-100">
      <h1 id="titolo-paginainiziale">Pricepal</h1>
      <h4 id="sottotitolo-paginainiziale">Tieni traccia delle tue spese</h4>
      <div id="box-paginainiziale">
        <button onClick={() => {cambiaSchermata(1)}} className="button-paginainiziale">Accedi</button>
        <button onClick={() => {cambiaSchermata(2)}} className="button-paginainiziale">Registrati</button>
      </div>
      
    </div>
  )
}

export default Paginainiziale