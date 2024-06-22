import { Link } from 'react-router-dom'
import { AddNewUser } from '../components/AddNewUser'

export function LogIn() {
  //TODO if user is already logged in, direct to another page
  //ADD all the Auth

  return (
    <section>
      <div className="container is-fluid">
        <h1 className="title has-text-centered has-text-primary">
          Welcome to TripHive
        </h1>
        <p className="has-text-centered mb-5">Sign Up or Log In</p>
        <div className="columns is-fluid">
          <div className="column is-half is-offset-one-quarter">
            <form className="field-is-horizontal is-centered">
              <div className="field">
                <label className="label is-medium">Email</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Email" />
                </div>
              </div>
              <div className="field">
                <label className="label is-medium">Password</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Password" />
                </div>
              </div>
              <div className="field is-grouped is-grouped-centered mt-6">
                <Link to={'/my-trips'}>
                  <button className="button is-primary">Log In</button>
                </Link>
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
