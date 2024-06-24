import { useState } from 'react'
import { useFriends } from '../context/FriendsContext'
import { addUserToTrip } from '../apis/trips'
import { useSelectedFriends } from '../context/SelectedFriendsContext'

// Define User and Users interfaces
interface User {
  id: number
  username: string
  email: string
  auth0id: string
  first_name: string
  last_name: string
  phone_number: string
  profile_picture: string
}

interface Users {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  profilePicture: string
}

interface AddTravellerProps {
  onSelectFriend: (friend: Users) => void
  onRemoveFriend: (friendId: number) => void
  tripId: number
}

// Conversion function
const convertUserToUsers = (user: User): Users => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    phoneNumber: user.phone_number,
    profilePicture: user.profile_picture,
  }
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
                {friends.map((friend, e) => (
                  <li key={e}>
                    <button
                      className="button"
                      onClick={() => {
                        const userAsUsers = convertUserToUsers(friend)
                        onSelectFriend(userAsUsers)
                        handleSelectFriend(userAsUsers)
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
