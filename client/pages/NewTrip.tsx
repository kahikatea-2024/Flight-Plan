import { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import { addTrip } from '../apis/trips'
import { Trips } from '../../models/flightplan'
import { useAuth } from '../context/UserContext'

export function NewTrip() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [tripName, setTripName] = useState('')
  const navigate = useNavigate()
  const { state } = useAuth()
  const userId = state.user?.id

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const tripData: Trips = {
      id: Date.now(), // or some other unique ID generator
      createdBy: userId || 0, // might need to handle the 0 user differently..
      tripName,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }

    try {
      await addTrip(tripData)
      navigate(
        `/schedule?startDate=${encodeURIComponent(tripData.startDate)}&endDate=${encodeURIComponent(tripData.endDate)}&tripName=${encodeURIComponent(tripData.tripName)}`,
      )
    } catch (error) {
      console.error('Failed to add trip:', error)
    }
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
