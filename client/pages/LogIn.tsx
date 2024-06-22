import { useNavigate } from 'react-router-dom'
import { AddNewUser } from '../components/AddNewUser'
import { useAuth } from '../context/UserContext'
import { useState } from 'react'
import { useFetchUsers } from '../hooks/useFetchUsers'

// const users: Users[] = [
//   {
//     id: 1,
//     username: 'callumG',
//     email: 'callum@example.com',
//     firstName: 'callum',
//     lastName: 'green',
//     phoneNumber: '0213456789',
//     profilePicture: '',
//   },
//   {
//     id: 2,
//     username: 'AimeeK',
//     email: 'Aimee@example.com',
//     firstName: 'Aimee',
//     lastName: 'kilmartin',
//     phoneNumber: '021334577',
//     profilePicture: '',
//   },
//   {
//     id: 3,
//     username: 'BradC',
//     email: 'Brad@example.com',
//     firstName: 'Brad',
//     lastName: 'Craig',
//     phoneNumber: '0213575644',
//     profilePicture: '',
//   },
//   {
//     id: 4,
//     username: 'RegieM',
//     email: 'regie@example.com',
//     firstName: 'regie',
//     lastName: 'malonzo',
//     phoneNumber: '0213456757',
//     profilePicture: '',
//   },
// ]

export function LogIn() {
  //TODO if user is already logged in, direct to another page
  //ADD all the Auth

  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const { users, loading, error } = useFetchUsers()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find((user) => user.email === email)
    if (user) {
      dispatch({ type: 'LOGIN', user })
      navigate('/my-trips')
    } else {
      alert('Invalid email')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }
  return (
    <section>
      <div className="container is-fluid">
        <h1 className="title has-text-centered has-text-primary">
          Welcome to TripHive
        </h1>
        <p className="has-text-centered mb-5">Sign Up or Log In</p>
        <div className="columns is-fluid">
          <div className="column is-half is-offset-one-quarter">
            <form
              className="field-is-horizontal is-centered"
              onSubmit={handleLogin}
            >
              <div className="field">
                <label className="label is-medium">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* PASSWORD FIELD */}
              {/* <div className="field">
                <label className="label is-medium">Password</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Password" />
                </div>
              </div> */}
              <div className="field is-grouped is-grouped-centered mt-6">
                <button className="button is-primary" type="submit">
                  Log In
                </button>
                <Link to={'/sign-up'}>
                  <button className="button is-light">Sign Up</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
