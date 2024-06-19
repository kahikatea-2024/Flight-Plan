import { Outlet } from 'react-router-dom'
import { useFruits } from '../hooks/useFruits.ts'
import { NavBar } from './Navbar.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <NavBar />

        <h1 className="text-3xl font-bold underline">
          TripPlan (working title)
        </h1>
        <Outlet />
        <button className="button">test button </button>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div>
    </>
  )
}

export default App
