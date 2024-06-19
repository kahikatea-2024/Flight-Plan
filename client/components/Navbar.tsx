import { useState } from 'react'
import 'bulma/css/bulma.css'
// import './styles.scss'

export function NavBar() {
  const [isActive, setIsActive] = useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <div>TripHive</div>
        </a>

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
          <a className="navbar-item">My Trips</a>
          <a className="navbar-item">Schedule</a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <a className="navbar-item">My Profile</a>

              <a className="navbar-item">My Friends</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Log Out</a>
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
