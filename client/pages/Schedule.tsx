import { useLocation, useNavigate } from 'react-router-dom'
import { format, eachDayOfInterval } from 'date-fns'
import { AddTraveller } from '../components/AddTraveller'
import { useEffect } from 'react'
import { Users as User } from '../../models/flightplan'
import { fetchTravelers } from '../apis/trips'
import { useSelectedFriends } from '../context/SelectedFriendsContext'

const generateDateList = (startDate: Date, endDate: Date): Date[] => {
  return eachDayOfInterval({ start: startDate, end: endDate })
}

export default function Schedule() {
  const { selectedFriends, setSelectedFriends } = useSelectedFriends()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const startDate = searchParams.get('startDate') || new Date().toISOString()
  const endDate = searchParams.get('endDate') || new Date().toISOString()
  const tripName = searchParams.get('tripName') || 'Trip'
  const tripId = searchParams.get('tripId') || 'tripId'
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dates = generateDateList(start, end)

  // Parse tripId from URL parameters
  const parsedTripId = parseInt(searchParams.get('tripId') || '', 10) // Ensure to handle NaN if not found or invalid

  console.log('Parsed tripId:', parsedTripId) // Log the parsed tripId

  useEffect(() => {
    console.log('Fetching travelers for trip:', parsedTripId)
    if (!isNaN(parsedTripId)) {
      fetchTravelers(parsedTripId)
        .then((data) => {
          console.log('Fetched travelers:', data)
          setSelectedFriends(data)
        })
        .catch(console.error)
    }
  }, [parsedTripId, setSelectedFriends])

  const handleSelectFriend = (friend: User) => {
    // Check if the friend is already in the selectedFriends list
    if (
      !selectedFriends.some((selectedFriend) => selectedFriend.id === friend.id)
    ) {
      setSelectedFriends((prevFriends) => [...prevFriends, friend])
    } else {
      console.log(`Friend with id ${friend.id} is already selected.`)
      // Optionally, you can provide feedback to the user that the friend is already selected.
    }
  }

  const handleRemoveFriend = (friendId: number) => {
    setSelectedFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== friendId),
    )
  }

  const handleDateClick = (tripId: string, date: Date) => {
    navigate(`/tripId/${tripId}/date/${format(date, 'yyyy-MM-dd')}`)
  }

  return (
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title has-text-centered">Trip Schedule</h1>
        <h2 className="subtitle has-text-centered">{tripName}</h2>
        <div className="travellers-container">
          <h3 className="has-text-centered">
            Click + to add a traveller to the trip, double click to remove them
          </h3>
          <div className="travellers-wrapper">
            <AddTraveller
              onSelectFriend={handleSelectFriend}
              onRemoveFriend={handleRemoveFriend}
              tripId={parsedTripId} // Pass tripId to AddTraveller
            />
          </div>
          <div className="selected-friends-list">
            {selectedFriends.length > 0 && (
              <ul>
                {selectedFriends.map((friend, ind) => (
                  <li
                    key={ind}
                    onDoubleClick={() => handleRemoveFriend(friend.id)}
                  >
                    {/* {friend.username} */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="dates-list-container">
          <ul>
            {dates.map((date, index) => (
              <li key={index} className="date-item">
                <span className="date-text">
                  {format(date, 'EEE dd MMM').toUpperCase()}
                </span>
                <button
                  className="button is-primary"
                  onClick={() => handleDateClick(tripId, date)}
                >
                  View Day
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
