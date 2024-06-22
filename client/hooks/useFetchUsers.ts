import { useState, useEffect } from 'react'
import { getUsers } from '../apis/users'
import { Users } from '../../models/flightplan'

export function useFetchUsers() {
  const [users, setUsers] = useState<Users[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers()
        setUsers(usersData)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch users:', err)
        setError('Failed to fetch users')
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading, error }
}
