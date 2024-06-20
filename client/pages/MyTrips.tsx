import { Link } from 'react-router-dom'
import { useTrips } from '../hooks/useTrips'

export function MyTrips() {
  const { data, isLoading, isError } = useTrips(1)
  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError || !data) {
    return <p>Error getting trips</p>
  }
  return (
    <section>
      <div className="container is-fluid">
        <h1 className="title has-text-centered has-text-primary">My Trips</h1>
        {data.length >= 1 ? (
          data.map(({ tripName, startDate, endDate }) => (
            <li key={tripName}>
              <p>
                Title:
                {tripName}
              </p>
              <p>Start: {startDate}</p>
              <p>End: {endDate}</p>
            </li>
          ))
        ) : (
          <>
            <h2 className="has-text-centered mb-5">No trips yet...</h2>
            <p className="has-text-centered mb-5">
              Click below to start planning
            </p>
          </>
        )}
        {/* <h2 className="has-text-centered mb-5">Add a new Trip</h2> */}
        <Link to={'/new-trip'}>
          <button className="button is-primary">Add Trip</button>
        </Link>
      </div>
    </section>
  )
}

//      <div className="column is-fluid">
//<div className="column is-half is-offset-one-quarter">
