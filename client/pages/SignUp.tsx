import { useState } from 'react'
import { NewUser } from '../../models/flightplan'
import { addNewUser } from '../apis/newUser'
import { Link } from 'react-router-dom'

export default function AddNewUser() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('submitted')

    const newUser: NewUser = {
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
    }

    try {
      await addNewUser(newUser)
    } catch (error) {
      console.error('Failed to add event:', error)
    }
    // console.log('data', newUser)
  }
  return (
    <section>
      <div className="container is-fluid is-centered">
        <h2 className="is-size-2 has-text-centered has-text-primary">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="field-is-centered mt-6">
          <div className="columns">
            <div className="column is-third">
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="column is-third ">
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-grouped is-grouped-centered mt-6">
            <Link to={'/my-trips'}>
              <button className="button is-primary">Sign Up</button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
