import { useState } from 'react'
import { SanitizedUser } from '../../models/flightplan'
import { useAddUserToTrips } from '../hooks/useTrips'
import { addUserToTrip } from '../apis/trips'

export function AddTravller() {
  const fakeFriends: SanitizedUser[] = [
    {
      id: 2,
      username: 'AimeeK',
      firstName: 'Aimee',
      lastName: 'Kilmartin',
      profilePicture: '',
    },
    {
      id: 3,
      username: 'BradC',
      firstName: 'Brad',
      lastName: 'Craig',
      profilePicture: '',
    },
    {
      id: 4,
      username: 'RegieM',
      firstName: 'Regie',
      lastName: 'Malonzo',
      profilePicture: '',
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<SanitizedUser[]>([])
  const { isLoading, isError } = useAddUserToTrips()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSelectFriend = (friend: SanitizedUser) => {
    if (
      !selectedFriends?.some(
        (selectedFriend) => selectedFriend.id === friend.id,
      )
    ) {
      setSelectedFriends([...selectedFriends, friend])
    }
    closeModal()
  }

  const handleRemoveFriend = (friendId: number) => {
    setSelectedFriends(
      selectedFriends.filter((friend) => friend.id !== friendId),
    )
  }

  const handleAddTravellers = async () => {
    // Call your hook to add each selected friend to the trip
    selectedFriends.forEach(async (friend) => {
      try {
        await addUserToTrip(tripId, friend.username)
        console.log(friend.username)
        console.log(`Added ${friend.username} to the trip successfully`)
      } catch (error) {
        console.error(`Failed to add ${friend.username} to the trip`, error)
      }
    })
    setSelectedFriends([])
  }

  return (
    <div>
      <div className="friends-container">
        {selectedFriends?.map((friend) => (
          <span
            key={friend.id}
            className="tag is-info is-medium"
            onDoubleClick={() => handleRemoveFriend(friend.id)}
            style={{ cursor: 'pointer' }}
          >
            {friend.username}
          </span>
        ))}
        <button className="button is-primary add-button" onClick={openModal}>
          +
        </button>
      </div>

      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <div className="box">
              <h2 className="title">Select a Friend</h2>
              <ul>
                {fakeFriends.map((friend) => (
                  <li key={friend.id}>
                    <button
                      className="button"
                      onClick={() => handleSelectFriend(friend)}
                    >
                      {friend.username}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            className="modal-close is-large"
            onClick={closeModal}
          ></button>
        </div>
      )}
      <button className="button is-success" onClick={handleAddTravellers}>
        Add Travellers to Trip
      </button>
    </div>
  )
}
// function useaddUserToTrips(tripId: any, username: string) {
//   throw new Error('Function not implemented.')
// }
