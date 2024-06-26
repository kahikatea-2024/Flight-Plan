import { useQuery } from '@tanstack/react-query'
import { getTrips } from '../apis/trips'

export function useTrips(userId: number | null) {
  // const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trips', userId],
    queryFn: async () => {
      if (userId === null) return []
      const res = await getTrips(userId)

      return res
    },
    enabled: userId !== null, // Disable the query if userId is null
  })
  return { data, isLoading, isError }
}
