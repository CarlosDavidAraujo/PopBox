import { useMutation, useQueryClient } from "react-query"
import { api } from "../../../shared/services/api"

export const useEditUserMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (body) => api.put("/admin/edit-user", body),
    onSuccess: () => {
      queryClient.invalidateQueries(["usuarios"])
    },
  })
  return mutation
}
