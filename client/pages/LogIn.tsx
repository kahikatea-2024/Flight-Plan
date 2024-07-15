import { useAuth0 } from '@auth0/auth0-react'

export default function LogIn() {
  const { loginWithRedirect } = useAuth0()

  return (
    <section>
      <div className="container is-fluid">
        <img src="/1.png" className="login-logo" alt="logo" />
        <p className="has-text-centered mb-5">Sign Up or Log In</p>
        <div className="columns is-fluid">
          <div className="column is-half is-offset-one-quarter">
            <div className="field-is-horizontal is-centered">
              <div className="field is-grouped is-grouped-centered mt-6">
                <button
                  className="button is-primary"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </button>
                <button
                  className="button is-light"
                  onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
