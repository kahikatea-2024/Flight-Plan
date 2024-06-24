import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUsers'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { Users } from '../../models/flightplan'
import { useAuth } from '../context/UserContext'

export default function MyProfile() {
  const { state } = useAuth()
  const { user: loggedInUser } = state

  if (!loggedInUser) return <div>Please log in</div>

  const userId = loggedInUser.id
  const { data: user, isLoading, error } = useUser(userId)
  const updateUser = useUpdateUser(userId)

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
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          name="username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="profilePicture"
          value={formValues.profilePicture}
          onChange={handleChange}
          placeholder="Profile Picture URL"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  )
}
