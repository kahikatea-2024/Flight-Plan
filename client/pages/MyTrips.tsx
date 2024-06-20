import { Link } from 'react-router-dom'
import { useTrips } from '../hooks/useTrips'

export function MyTrips() {
  const { data, isLoading, isError } = useTrips(1)
  //TODO make dynamic

  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError || !data) {
    return <p>Error getting trips</p>
  }
  return (
    <section>
      <div className="container is-fluid has-text-centered">
        <h1 className="title has-text-centered has-text-primary">My Trips</h1>
        <div className="column is-fluid">
          <div className="column is-half is-offset-one-quarter">
            {data.length >= 1 ? (
              <ul className="card is-primary is-outlined">
                {data.map(({ tripName, startDate, endDate }) => (
                  <li key={tripName}>
                    <p className="card-header-title is-centered is-size-4">
                      {tripName}
                    </p>
                    <div className="field is-grouped">
                      <div className="column is-third">
                        <p className="card-content has-text-left is-size-5">
                          Start: {startDate}
                        </p>
                      </div>
                      <div className="column is-third">
                        <p className="card-content has-text-right is-size-5">
                          End: {endDate}
                        </p>
                      </div>
                    </div>
                    <Link to={'/view-trip/1'}>
                      {/* //TODO make dynamic */}
                      <button className="button is-primary is-centered mb-5">
                        View Detail
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <h2 className="has-text-centered mb-5">No trips yet...</h2>
                <p className="has-text-centered mb-5">
                  Click below to start planning
                </p>
              </>
            )}
            {/* <h2 className="has-text-centered mb-5">Add a new Trip</h2> */}
            <div className="container is-centered">
              <Link to={'/new-trip'}>
                <button className="button is-primary ">Add Trip</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
