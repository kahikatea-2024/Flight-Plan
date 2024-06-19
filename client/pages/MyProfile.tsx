export function MyProfile() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">My Profile</h1>
        <div className="columns is-centered">
          <div className="column is-half-mobile is-one-fifth-desktop custom-form">
            <h2 className="subtitle has-text-centered">Edit</h2>
            <form>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input className="input" type="text" placeholder="e.g Alex" />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="e.g Smith"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="e.g. alexsmith@gmail.com"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone Number</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="021 234 567"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
