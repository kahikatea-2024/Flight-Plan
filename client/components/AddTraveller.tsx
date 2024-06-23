import React, { useState } from 'react'
import { useFriends } from '../context/FriendsContext'
import { addTrips, addUserToTrip } from '../apis/trips'
import { Trips } from '../../models/flightplan'

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

interface AddTravllerProps {
  onSelectFriend: (friend: User) => void
  onRemoveFriend: (friendId: number) => void
  tripId: number
}

export function AddTraveller({
  onSelectFriend,
  onRemoveFriend,
  tripId,
}: AddTravllerProps) {
  const { friends, removeFriend } = useFriends()
  const [selectedFriends, setSelectedFriends] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSelectFriend = async (friend: User) => {
    try {
      await addUserToTrip(tripId, friend.username)
      setSelectedFriends([...selectedFriends, friend])
      onSelectFriend(friend)
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
        {selectedFriends.map((friend) => (
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
                {friends.map((friend) => (
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
    </div>
  )
}
