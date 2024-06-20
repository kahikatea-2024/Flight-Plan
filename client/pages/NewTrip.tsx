import { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

export function NewTrip() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [tripName, setTripName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Add form submission logic here
    console.log('Trip Name:', tripName)
    console.log('Start Date:', startDate)
    console.log('End Date:', endDate)
    navigate('/schedule', {
      state: {
        startDate: startDate,
        endDate: endDate,
        tripName,
      },
    })
  }

  return (
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title has-text-centered">Start a new Trip</h1>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Trip Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                  />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">Start Date</label>
                    <div className="control">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date as Date)}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">End Date</label>
                    <div className="control">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date as Date)}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-primary">
                    Lets Go!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
