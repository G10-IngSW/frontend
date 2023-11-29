
interface Props {
  func: (id:number) => void;
}

const Paginainiziale = ({func}:Props) => {
  return (
    <div>
      PricePal<br />
      <button onClick={() => {func(1)}}>Accedi</button>
      <button onClick={() => {func(2)}}>Registrati</button>
    </div>
  )
}

export default Paginainiziale