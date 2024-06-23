import { Outlet } from 'react-router-dom'
import { NavBar } from './Navbar.tsx'
import { UserProvider } from '../context/UserContext.tsx'
import { FriendsProvider } from '../context/FriendsContext.tsx'

function App() {
  return (
    <>
      <UserProvider>
        <FriendsProvider>
          <div className="app">
            <NavBar />

            <Outlet />
          </div>
        </FriendsProvider>
      </UserProvider>
    </>
  )
}

export default App
