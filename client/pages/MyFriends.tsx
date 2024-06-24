import React, { useState } from 'react'
import { useMyFriends } from '../hooks/useMyFriends'
import { useFriends } from '../context/FriendsContext'
import { useAuth } from '../context/UserContext'

export default function MyFriends() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { friends, addFriend: addFriendContext, removeFriend } = useFriends()
  const { data: users, isLoading, isError } = useMyFriends()
  const { state } = useAuth()
  const { user } = state

  const handleFindFriend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user || typeof user.id !== 'number') {
      setMessage('Please log in to add friends.')
      return
    }

    if (!users) return

    const foundUser = users.find((user) => user.email === email)

    if (foundUser) {
      const isAlreadyAdded = friends.some((friend) => friend.email === email)

      if (isAlreadyAdded) {
        setMessage('This friend is already added.')
      } else {
        setMessage('')
        addFriendContext(foundUser) // Add friend to context
        setEmail('')
      }
    } else {
      setMessage('User not found')
    }
  }

  const handleRemoveFriend = (friendId: number | undefined) => {
    if (!friendId) return

    const confirmed = window.confirm(
      'Are you sure you want to remove this friend?',
    )
    if (confirmed) {
      removeFriend(friendId)
    }
  }

  if (isLoading) return <p>Loading....</p>
  if (isError) return <p>Error loading users</p>

  return (
    <div className="container is-fluid">
      <h1 className="title has-text-centered has-text-primary">My Friends</h1>
      <h2 className="card-header-title is-centered is-size-4">Add Friend</h2>
      <h3 className="has-text-centered mb-5">
        Enter email to add to My Friends
      </h3>
      <div className="column is-fluid">
        <div className="column is-half is-offset-one-quarter">
          <form
            className="field-is-horizontal is-centered"
            onSubmit={handleFindFriend}
          >
            <div className="field">
              <div className="control">
                <input
                  type="text"
                  className="input has-text-centered"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered mt-6">
              <button className="button is-primary is-centered mb-5">
                Add Friend
              </button>
            </div>
          </form>
          {message && <p className="has-text-centered">{message}</p>}

          {friends.length > 0 && (
            <div className="box has-text-centered">
              <h3 className="card-header-title is-centered is-size-4 mb-5">
                Added Friends:
              </h3>
              {friends.map((friend) => (
                <div className="text mb-5" key={`${friend.id}-${friend.email}`}>
                  <h4>Username: {friend.username}</h4>
                  <p>
                    Name: {friend.first_name} {friend.last_name}
                  </p>
                  <button
                    className="button is-danger is-small"
                    onClick={() => handleRemoveFriend(friend.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
