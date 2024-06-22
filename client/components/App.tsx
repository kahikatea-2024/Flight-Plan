import { Outlet } from 'react-router-dom'
import { NavBar } from './Navbar.tsx'
import { UserProvider } from '../context/UserContext.tsx'

function App() {
  return (
    <>
      <UserProvider>
        <div className="app">
          <NavBar />

          <Outlet />
        </div>
      </UserProvider>
    </>
  )
}

export default App
