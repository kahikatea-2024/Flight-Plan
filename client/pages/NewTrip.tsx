export function NewTrip() {
  return (
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title has-text-centered">Start a new Trip</h1>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <form>
              <div className="field">
                <label className="label">Trip Name</label>
                <div className="control">
                  <input type="text" className="input" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
