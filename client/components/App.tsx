import { Outlet } from 'react-router-dom'
import { NavBar } from './Navbar.tsx'
import { UserProvider } from '../context/UserContext.tsx'
import Footer from './Footer.tsx'

function App() {
  return (
    <>
      <UserProvider>
        <div className="app">
          <NavBar />

          <Outlet />
        </div>
        <Footer />
      </UserProvider>
    </>
  )
}

export default App
