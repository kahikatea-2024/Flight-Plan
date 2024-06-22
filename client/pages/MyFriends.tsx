import { useEffect, useState } from 'react'
import { useMyFriends } from '../hooks/useMyFriends'
interface User {
  id?: number
  username?: string
  email?: string
  auth0id?: string
  first_name?: string
  last_name?: string
  phone_number?: string
  profile_picture?: string
}

export function MyFriends() {
  const [email, setEmail] = useState('')
  const [addedFriends, setAddedFriends] = useState<User[]>([])
  const [message, setMessage] = useState('')

  const { data: users, isLoading, isError } = useMyFriends()

  //Stores friends To local
  useEffect(() => {
    const storedFriends = localStorage.getItem('localStorage')
    if (storedFriends) {
      setAddedFriends(JSON.parse(storedFriends))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('localStorage', JSON.stringify(addedFriends))
  }, [addedFriends])

  const handleFindFriend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!users) return

    const user = users.find((user) => user.email === email)
    if (user) {
      const isAlreadyAdded = addedFriends.some(
        (friend) => friend.email === email,
      )

      if (isAlreadyAdded) {
        setMessage('This friend is already added.')
      } else {
        setMessage('')
        setAddedFriends((prevFriends) => [...prevFriends, user])
      }
    } else {
      setMessage('User not found')
    }

    setEmail('') // Clear the input after checking the friend
  }

  const handleRemoveFriend = (friendId) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this friend?',
    )
    if (confirmed) {
      setAddedFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.id !== friendId),
      )
    }
  }
  if (isLoading) return <p>Loading....</p>
  if (isError) return <p>Error loading users</p>

  return (
    <div className="container is-fluid">
      <h1 className="title has-text-centered has-text-primary">My Trips</h1>
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
          {addedFriends.length > 0 && (
            <div className="box has-text-centered">
              <h3 className="card-header-tittle is-centered is-size-4 mb-5">
                Added Friends:
              </h3>
              {addedFriends.map((friend) => (
                <div className="text mb-5" key={friend.id}>
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
