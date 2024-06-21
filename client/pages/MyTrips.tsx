import { Link } from 'react-router-dom'
import { useTrips } from '../hooks/useTrips'

export function MyTrips() {
  const { data, isLoading, isError } = useTrips(2)

  console.log('Trips:', data)

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
            <div className="container is-centered">
              <Link to={'/new-trip'}>
                <button className="button is-primary mb-5">Add Trip</button>
              </Link>
            </div>
            {data.length >= 1 ? (
              <ul>
                {data.map(({ tripName, startDate, endDate }) => (
                  <li key={tripName} className="card is-primary is-outlined">
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
                    <Link
                      to={{
                        pathname: '/schedule',
                        search: `?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&tripName=${encodeURIComponent(tripName)}`,
                      }}
                    >
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
          </div>
        </div>
      </div>
    </section>
  )
}
