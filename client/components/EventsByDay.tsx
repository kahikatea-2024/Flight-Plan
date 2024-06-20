import { useEvents } from '../hooks/useEvents'

//TODO make dynamic and make get events by day back end route
//Or make calendar selection scroll
const day = 1

export function EventsByDay() {
  const { data, isLoading, isError } = useEvents(day)
  //TODO make dynamic

  console.log('day', day)
  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError || !data) {
    return <p>Error getting events</p>
  }
  return (
    <section className="mb-6">
      <div>day</div>
      <div className="container is-fluid">
        <h1 className="title has-text-centered has-text-primary">
          Todays Events
        </h1>
        {/* <div className="column is-fluid"> */}
        {data.length >= 1 ? (
          <ul className="card is-primary is-outlined">
            {data.map(({ id, description, startTime, endTime, notes }) => (
              <li key={id + description}>
                <p className="card-content has-text-left is-size-5 pb-1">
                  <span> Start Time: {startTime} </span>
                  <span className="ml-6">End Time: {endTime}</span>
                </p>

                <p className="card-content is-size-5 pb-1">{description}</p>
                <div className="">
                  <p className="card-content is-size-5">Note: {notes}</p>
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
