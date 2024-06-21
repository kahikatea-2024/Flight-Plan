import { useParams } from 'react-router-dom'
import { useEvents } from '../hooks/useEvents'

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

  //SORTING THE TIME
  data.sort((a, b) => {
    const parseTime = (time: string): { hour: number; isPM: boolean } => {
      const hour = parseInt(time) // Get the numerical part of the time
      const isPM = time.toLowerCase().includes('pm') // Check if it's 'pm'
      return { hour, isPM }
    }

    const { hour: hourA, isPM: isPMA } = parseTime(a.startTime)
    const { hour: hourB, isPM: isPMB } = parseTime(b.startTime)

    // Compare hours taking 'pm' into account
    if (isPMA && !isPMB) {
      return 1 // a should come after b (b is am, a is pm)
    } else if (!isPMA && isPMB) {
      return -1 // a should come before b (a is am, b is pm)
    } else {
      // Same am/pm or both am or both pm, compare numerical hours
      return hourA - hourB
    }
  })

  // console.log('sorted', data)

  return (
    <section className="mb-6">
      <div className="container is-fluid">
        <h1 className="is-size-2 has-text-centered has-text-primary">Events</h1>

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
