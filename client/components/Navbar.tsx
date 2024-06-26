import { useEffect, useState } from 'react'
import 'bulma/css/bulma.css'
import { Link, useNavigate } from 'react-router-dom'
import { useTrips } from '../hooks/useTrips'
import { Trips } from '../../models/flightplan'
import { useAuth } from '../context/UserContext'

export function NavBar() {
  const [isActive, setIsActive] = useState(false)
  const { state, handleLogout } = useAuth()
  const userId = state.user ? state.user.id : null
  const { data: trips } = useTrips(userId)
  const [firstTrip, setFirstTrip] = useState<Trips | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (trips && trips.length > 0) {
      setFirstTrip(trips[0])
    }
  }, [trips])

  const schedulePath = firstTrip
    ? `/schedule?tripId=${firstTrip.id}&startDate=${encodeURIComponent(firstTrip.startDate)}&endDate=${encodeURIComponent(firstTrip.endDate)}&tripName=${encodeURIComponent(firstTrip.tripName)}`
    : '#'

  const handleLogoutClick = () => {
    handleLogout()
    navigate('/') // Redirect to the home or login page after logging out
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to={'/'} className="navbar-item">
          <div>
            <img className="navbar-logo" src="/1.png" alt="logo" />
          </div>
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
          <Link to={schedulePath} className="navbar-item">
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
              <button onClick={handleLogoutClick} className="navbar-item">
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {/* TODO: Conditional render user with AUTH */}
            {state.user ? (
              <div>{state.user.username}</div>
            ) : (
              <div>Please Sign In</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
