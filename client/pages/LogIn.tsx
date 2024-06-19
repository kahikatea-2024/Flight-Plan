export function LogIn() {
  //TODO if user is logged in, direct to another page
  return (
    <section>
      <div className="container is-fluid">
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
            <button className="button is-primary">Log In</button>
            <button className="button is-secondary">Sign Up</button>
          </div>
        </form>
      </div>
    </section>
  )
}
