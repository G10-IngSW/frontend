
interface Props {
  func: () => void;
}


const CreazioneAccount = ({func}: Props) => {
  return (
    <div>
      Registrazione<br />
      <button onClick={func}>Crea account</button>
    </div>
  )
}

export default CreazioneAccount