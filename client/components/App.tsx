import { useFruits } from '../hooks/useFruits.ts'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Fruits!
        </h1>
        <button className="button">test button </button>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div>
    </>
  )
}

export default App
