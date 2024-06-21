import { useState } from 'react'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom'
// import './styles.scss'

export function NavBar() {
  const [isActive, setIsActive] = useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to={'/'} className="navbar-item">
          <div>TripHive</div>
        </Link>

        <button
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded={isActive}
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
      >
        <div className="navbar-start">
          <Link to={'/my-trips'} className="navbar-item">
            My Trips
          </Link>
          <Link to={'/schedule'} className="navbar-item">
            Schedule
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            {/* Changed more from anchor tag to div */}
            <div className="navbar-link">More</div>
            <div className="navbar-dropdown">
              <Link to={'my-profile'} className="navbar-item">
                My Profile
              </Link>

              <Link to={'my-friends'} className="navbar-item">
                My Friends
              </Link>
              <hr className="navbar-divider" />
              <Link to={'/'} className="navbar-item">
                Log Out
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {/* TODO: Conditional render user with AUTH */}
            <div>User Name</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
