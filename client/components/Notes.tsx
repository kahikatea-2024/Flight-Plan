export function Notes() {
  return (
    <section>
      <div className="container is-fluid is-centered">
        <div className="columns is-fluid">
          <div className="column ">
            <h2 className="is-size-2 has-text-centered has-text-primary">
              Add A Note
            </h2>
            <form className="field-is-horizontal is-centered">
              <div className="field">
                <label className="label ">Notes for the Day</label>
                <div className="control">
                  <textarea
                    className="textarea text is-size-6 "
                    placeholder="Notes..."
                    rows="12"
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
