import useAxiosClient from "../../src/hooks/api.hook"
import { useQuery, useMutation } from "@tanstack/react-query"

interface User {
  id: string
  firstName: string
  lastName: string
  age: string
}

interface MutateUser {
  data: User
}

export const useFetchUsers = () => {
  const client = useAxiosClient();
  const queryFunction = async () => {
    const { data } = await client.get("/api/allUsers")
    return data
  }

  const { data, isLoading, isError, error } = useQuery({ queryKey: ['allUsers'], queryFn: queryFunction })
  return { data, isLoading, isError, error }
}

export const useUpdateUser = () => {
  const client = useAxiosClient()
  const mutationFunction = async ({ data }: MutateUser) => {
    const { data: result } = await client.post(`/api/editUser`, data)
    return result
  }

  return useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      // Can also invalidate queries here
    },
    onError: (error) => {
    },
  })
}