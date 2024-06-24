import { useState } from 'react'
import { useFriends } from '../context/FriendsContext'
import { addUserToTrip } from '../apis/trips'
import { useSelectedFriends } from '../context/SelectedFriendsContext'
import { Users } from '../../models/flightplan'

interface AddTravellerProps {
  onSelectFriend: (friend: Users) => void
  onRemoveFriend: (friendId: number) => void
  tripId: number
}

export function AddTraveller({
  onSelectFriend,
  onRemoveFriend,
  tripId,
}: AddTravellerProps) {
  const { friends, removeFriend } = useFriends()
  const { selectedFriends, setSelectedFriends } = useSelectedFriends()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSelectFriend = async (friend: Users) => {
    try {
      console.log('Selected friend:', friend)
      console.log('Adding to trip with ID:', tripId)
      await addUserToTrip(tripId, friend.username)
      setSelectedFriends([...selectedFriends, friend])
      closeModal()
    } catch (error) {
      console.error('Error adding user to trip:', error)
      // Handle error as needed
    }
  }

  const handleRemoveFriend = (friendId: number) => {
    onRemoveFriend(friendId)
    removeFriend(friendId)
    setSelectedFriends(
      selectedFriends.filter((friend) => friend.id !== friendId),
    )
  }

  return (
    <div>
      <div className="friends-container">
        {selectedFriends.map((friend, index) => (
          <div
            key={index}
            className="tag is-info is-medium"
            onDoubleClick={() => handleRemoveFriend(friend.id)}
            style={{ cursor: 'pointer' }}
          >
            {friend.firstName}
          </div>
        ))}
        <button className="button is-primary add-button" onClick={openModal}>
          Add Travellers to Trip
        </button>
      </div>

      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <div className="box">
              <h2 className="title">Select a Friend</h2>
              <ul>
                {friends.map((friend, e) => (
                  <li key={e}>
                    <button
                      className="button"
                      onClick={() => {
                        onSelectFriend(friend)
                        handleSelectFriend(friend)
                      }}
                    >
                      {friend.first_name}
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
    </div>
  )
}
