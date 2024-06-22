import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import { Users } from '../../models/flightplan'

type State = {
  user: Users | null
}

type Action = { type: 'LOGIN'; user: Users } | { type: 'LOGOUT' }

const initialState: State = {
  user: null,
}

const UserContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
})

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => useContext(UserContext)
