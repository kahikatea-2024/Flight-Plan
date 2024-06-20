import { Outlet } from 'react-router-dom'
import { NavBar } from './Navbar.tsx'

function App() {
  return (
    <>
      <div className="app">
        <NavBar />

        {/* <h1 className="is-size-3 has-text-centered">TripHive</h1> */}
        <Outlet />
      </div>
    </>
  )
}

export default App
