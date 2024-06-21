import { useParams } from 'react-router-dom'
import { useEvents } from '../hooks/useEvents'
import { format } from 'date-fns'

//TODO make dynamic and make get events by day back end route
//Or make calendar selection scroll

export function EventsByDay() {
  const day = useParams()
  const date = day.date

  const { data, isLoading, isError } = useEvents(date)
  console.log('day', day)
  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError || !data) {
    return <p>Error getting events</p>
  }

  const sortedData = data.sort(
    (a, b) => date,
    a.startTime.localeCompare(b.startTime),
  )
  console.log(sortedData)

  return (
    <section className="mb-6">
      <div className="container is-fluid">
        <h1 className="is-size-2 has-text-centered has-text-primary">Events</h1>
        <>{console.log('data', data)}</>
        {/* <div className="column is-fluid"> */}
        {data.length >= 1 ? (
          <ul className="">
            {data.map(({ id, description, startTime, endTime, note }) => (
              <li
                key={id + description}
                className="card is-primary is-outlined"
              >
                <p className="card-content has-text-left is-size-5 pb-1 has-background-primary-light">
                  <span> Start Time: {startTime} </span>
                  <span className="ml-6">End Time: {endTime}</span>
                </p>

                <p className="card-content is-size-5 pb-1">{description}</p>
                <div className="">
                  <p className="card-content is-size-5">Note: {note}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h2 className="has-text-centered mb-5">No events yet...</h2>
            <p className="has-text-centered mb-5">
              Add an event to start planning
            </p>
          </>
        )}
      </div>
      {/* </div> */}
    </section>
  )
}
