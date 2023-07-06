import { useMutation, useQueryClient } from "react-query"
import { api } from "../../../shared/services/api"

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation((body) => api.post("/usuarios/cadastro", body), {
    onSuccess: () => {
      queryClient.invalidateQueries("usuarios")
    },
  })
  return mutation
}
