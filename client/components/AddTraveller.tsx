import { useEffect, useState } from 'react'

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
  propSelectedFriends: User[]
}

export function AddTravller({
  onSelectFriend,
  onRemoveFriend,
  propSelectedFriends,
}: AddTravllerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<User[]>([])
  const [availableFriends, setAvailableFriends] = useState<User[]>([])

  // Initialize availableFriends from localStorage on component mount
  useEffect(() => {
    const storedFriends = localStorage.getItem('addedFriends')
    if (storedFriends) {
      const parsedFriends = JSON.parse(storedFriends)
      setAvailableFriends(parsedFriends)
    }
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSelectFriend = (friend: User) => {
    // Check if friend is already selected
    if (
      !selectedFriends.some((selectedFriend) => selectedFriend.id === friend.id)
    ) {
      // Update selectedFriends state
      setSelectedFriends([...selectedFriends, friend])
      // Remove friend from availableFriends
      setAvailableFriends(availableFriends.filter((f) => f.id !== friend.id))
      // Notify parent component (via onSelectFriend) about the selection
      onSelectFriend(friend)
      // Update localStorage with the updated selectedFriends
      localStorage.setItem(
        'addedFriends',
        JSON.stringify([...selectedFriends, friend]),
      )
    }
    closeModal() // Close the modal after selecting a friend
  }

  const handleRemoveFriend = (friendId: number) => {
    // Notify parent component (via onRemoveFriend) about the removal
    onRemoveFriend(friendId)
    // Update selectedFriends state
    setSelectedFriends(
      selectedFriends.filter((friend) => friend.id !== friendId),
    )
    // Find the removed friend from propSelectedFriends
    const friendToAddBack = propSelectedFriends.find((f) => f.id === friendId)
    if (friendToAddBack) {
      // Add friend back to availableFriends
      setAvailableFriends([...availableFriends, friendToAddBack])
      // Update localStorage with the updated selectedFriends
      localStorage.setItem(
        'addedFriends',
        JSON.stringify(selectedFriends.filter((f) => f.id !== friendId)),
      )
    }
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
                {availableFriends.map((friend) => (
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
