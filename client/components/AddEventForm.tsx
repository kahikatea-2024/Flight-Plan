export function AddEvent() {
  return (
    <section>
      <div className="container is-fluid is-centered">
        <div className="columns is-fluid">
          <div className="column  ">
            <h2 className="title has-text-centered has-text-primary">
              Add An Event
            </h2>
            <form className="field-is-horizontal is-centered">
              <div className="field">
                <label className="label">Event Title</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Event Title"
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="column is-third">
                  <div className="field">
                    <label className="label has-text-left">Start Time</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="End Time"
                    />
                  </div>
                </div>
                <div className="column is-third">
                  <div className="field">
                    <label className="label has-text-right">End Time</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="End Time"
                    />
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Event Notes</label>
                <div className="control">
                  <textarea
                    type="text"
                    className="textarea"
                    placeholder="Event Notes"
                    rows="4"
                  />
                </div>
              </div>

              <div className="field is-grouped is-grouped-centered mt-4">
                <button className="button is-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
