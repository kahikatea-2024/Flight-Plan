import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { Users } from '../../models/flightplan'

type AuthState = {
  user: Users | null
}

type LoginAction = { type: 'LOGIN'; payload: Users }
type LogoutAction = { type: 'LOGOUT' }
type Action = LoginAction | LogoutAction

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
}

type AuthContextType = {
  state: AuthState
  dispatch: React.Dispatch<Action>
  handleLogout: () => void // Add handleLogout to the context type
}

const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => null,
  handleLogout: () => {},
})

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    case 'LOGOUT':
      localStorage.removeItem('user')
      return { ...state, user: null }
    default:
      return state
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) })
    }
  }, [])

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ state, dispatch, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
