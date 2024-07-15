import { Outlet } from 'react-router-dom'
import { NavBar } from './Navbar.tsx'

import { FriendsProvider } from '../context/FriendsContext.tsx'
import { SelectedFriendsProvider } from '../context/SelectedFriendsContext.tsx'
import Footer from './Footer.tsx'

function App() {
  return (
    <>
      <FriendsProvider>
        <SelectedFriendsProvider>
          <div className="app">
            <NavBar />

            <Outlet />
            <Footer />
          </div>
        </SelectedFriendsProvider>
      </FriendsProvider>
    </>
  )
}

export default App
