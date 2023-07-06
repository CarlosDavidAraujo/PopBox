import { useMutation, useQueryClient } from "react-query"
import { api } from "../../../shared/services/api"

export const useDeleteUserMutation = (userID) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => api.delete(`/admin/delete-user/${userID}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["usuarios"])
    },
  })
  return mutation
}
