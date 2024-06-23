import React, { createContext, useState, useContext, ReactNode } from 'react'

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

interface FriendsContextType {
  friends: User[]
  addFriend: (friend: User) => void
  removeFriend: (friendId: number) => void
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined)

export const useFriends = () => {
  const context = useContext(FriendsContext)
  if (!context) {
    throw new Error('useFriends must be used within a FriendsProvider')
  }
  return context
}

export const FriendsProvider = ({ children }: { children: ReactNode }) => {
  const [friends, setFriends] = useState<User[]>([])

  const addFriend = (friend: User) => {
    setFriends((prevFriends) => [...prevFriends, friend])
  }

  const removeFriend = (friendId: number) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== friendId),
    )
  }

  return (
    <FriendsContext.Provider value={{ friends, addFriend, removeFriend }}>
      {children}
    </FriendsContext.Provider>
  )
}
