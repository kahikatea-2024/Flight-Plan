/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { useUpdateUser } from '../hooks/useUpdateUser.ts'
import { useUser } from '../hooks/useUsers.ts'
import { useAuth } from '../context/UserContext'

export default function MyProfile() {
  const { state } = useAuth()
  const { user: loggedInUser } = state

  // Check if user is logged in
  if (!loggedInUser) return <div>Please log in</div>

  // Extract userId from loggedInUser
  const userId = loggedInUser.id

  const [isEditing, setIsEditing] = useState(false)
  const updateUser = useUpdateUser(userId)
  const { data: user, isLoading, error } = useUser(userId)

  const [formValues, setFormValues] = useState({
    email: '',
    phoneNumber: '',
    username: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
  })

  useEffect(() => {
    if (user) {
      setFormValues({
        email: user.email,
        phoneNumber: user.phoneNumber,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
      })
    }
  }, [user])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser.mutate(formValues)
    setIsEditing(false)
  }

  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <h1 className="title">Edit Profile</h1>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                      <input
                        className="input"
                        type="tel"
                        name="phoneNumber"
                        value={formValues.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Profile Picture URL</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="profilePicture"
                        value={formValues.profilePicture}
                        onChange={handleChange}
                        placeholder="Profile Picture URL"
                      />
                    </div>
                  </div>
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button type="submit" className="button is-primary">
                        Save
                      </button>
                    </div>
                    <div className="control">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="has-text-centered">
                    <h1 className="title is-size-1">{user.username}</h1>
                    <div className="centered-image">
                      <figure className="image is-128x128">
                        <img
                          className="is-rounded"
                          src={user.profilePicture}
                          alt="Profile"
                        />
                      </figure>
                    </div>
                  </div>
                  <div className="content has-text-centered is-size-5">
                    <p>
                      <strong>First Name:</strong> {user.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {user.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {user.phoneNumber}
                    </p>
                    {/* <p>
                      <strong>Username:</strong> {user.username}
                    </p> */}
                  </div>
                  <div className="has-text-centered">
                    <button
                      className="button is-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
