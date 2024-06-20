import { useLocation, useNavigate } from 'react-router-dom'
import { format, eachDayOfInterval } from 'date-fns'

const generateDateList = (startDate: Date, endDate: Date): Date[] => {
  return eachDayOfInterval({ start: startDate, end: endDate })
}

export function Schedule() {
  const navigate = useNavigate()
  const location = useLocation()
  const { startDate, endDate } = location.state || {
    startDate: new Date(),
    endDate: new Date(),
  }

  const dates = generateDateList(new Date(startDate), new Date(endDate))

  const handleDateClick = (date: Date) => {
    navigate(`/date/${format(date, 'yyyy-MM-dd')}`)
  }

  return (
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title has-text-centered">Dates List</h1>
        <ul>
          {dates.map((date, index) => (
            <li key={index}>
              <button onClick={() => handleDateClick(date)}>
                {format(date, 'yyyy-MM-dd')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
