import PreviewLista from "./componenti/PreviewLista"

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <PreviewLista titolo="lista1" numberOfItems={12}></PreviewLista>
        <PreviewLista titolo="lista2" numberOfItems={7}></PreviewLista>
        <PreviewLista titolo="lista3" numberOfItems={182}></PreviewLista>
      </div>
    </div>
  )
}

export default Home