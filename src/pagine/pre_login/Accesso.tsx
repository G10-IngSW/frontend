
interface Props {
  func: () => void;
}

const Login = ({func}: Props) => {
  return (
    <div>
      Login<br />
      <button onClick={func}>Accedi</button>
    </div>
  )
}

export default Login