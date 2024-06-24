// SelectedFriendsContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react' // Import ReactNode for typing children
import { Users } from '../../models/flightplan' // Adjust the path as per your project structure

// Define the shape of your context value
interface SelectedFriendsContextType {
  selectedFriends: Users[]
  setSelectedFriends: React.Dispatch<React.SetStateAction<Users[]>>
}

// Create the context
const SelectedFriendsContext = createContext<
  SelectedFriendsContextType | undefined
>(undefined)

// Create a provider component
export const SelectedFriendsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFriends, setSelectedFriends] = useState<Users[]>([])

  return (
    <SelectedFriendsContext.Provider
      value={{ selectedFriends, setSelectedFriends }}
    >
      {children}
    </SelectedFriendsContext.Provider>
  )
}

// Custom hook to use the selected friends context
export const useSelectedFriends = () => {
  const context = useContext(SelectedFriendsContext)
  if (!context) {
    throw new Error(
      'useSelectedFriends must be used within a SelectedFriendsProvider',
    )
  }
  return context
}
