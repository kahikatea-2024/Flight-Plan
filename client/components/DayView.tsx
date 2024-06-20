import { format, eachDayOfInterval } from 'date-fns'

import { useLocation, useNavigate } from 'react-router-dom'
import { useTrips } from '../hooks/useTrips'

//PROBS WONT NEED, WAS TRYING A CALENDAR SCROLL FOR DATES

const generateDateList = (startDate: Date, endDate: Date): Date[] => {
  return eachDayOfInterval({ start: startDate, end: endDate })
}
export function DayView() {
  const { data, isLoading, isError } = useTrips(1)
  //TODO make dynamic

  const navigate = useNavigate()
  const location = useLocation()

  // const { startDate, endDate, tripName } = location.state || {
  //   startDate: data?.startDate,
  //   endDate: data?.endDate,
  //   tripName: 'Trip',
  // }

  // data?.map((date) => date.startDate)

  const start = data?.map((date) => date.startDate)
  const end = data?.map((date) => date.endDate)
  const dates = generateDateList(start, end)

  const handleDateClick = (date: Date) => {
    navigate(`/date/${format(date, 'yyyy-MM-dd')}`)
  }

  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError || !data) {
    return <p>Error getting trips</p>
  }
  return (
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title has-text-centered">Trip Schedule</h1>
        <h2 className="subtitle has-text-centered">name</h2>
        <div className="dates-list-container">
          <ul>
            {dates.map((date, index) => (
              <li key={index} className="date-item">
                <span className="date-text">
                  {format(date, 'EEE dd MMM').toUpperCase()}
                </span>
                <button
                  className="button is-primary"
                  onClick={() => handleDateClick(date)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
