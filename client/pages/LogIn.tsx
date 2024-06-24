import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/UserContext'
import { useState } from 'react'
import { useFetchUsers } from '../hooks/useFetchUsers'

export default function LogIn() {
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
      dispatch({ type: 'LOGIN', payload: user })
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
        <img src="/1.png" className="login-logo" alt="logo" />

        <p className="has-text-centered mb-5">Sign Up or Log In</p>
        <div className="columns is-fluid">
          <div className="column is-half is-offset-one-quarter">
            <form
              className="field-is-horizontal is-centered"
              onSubmit={handleLogin}
            >
              <div className="field">
                <label className="label is-medium" htmlFor="email">
                  Email
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    id="email"
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
