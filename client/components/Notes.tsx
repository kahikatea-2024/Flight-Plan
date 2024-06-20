export function Notes() {
  return (
    <section>
      <div className="container is-fluid is-centered">
        <div className="columns is-fluid">
          <div className="column is-half is-offset-one-quarter ">
            <form className="field-is-horizontal is-centered">
              <div className="field">
                <label className="label is-medium">Notes for the Day</label>
                <div className="control">
                  <textarea
                    className="textarea is-primary text is-size-6 "
                    placeholder="Notes..."
                    rows="10"
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
