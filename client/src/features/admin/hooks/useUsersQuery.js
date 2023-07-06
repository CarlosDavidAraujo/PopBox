import { useQuery } from "react-query"
import { api } from "../../../shared/services/api"
import { useAdmin } from "../../../contexts/AdminContext"

export const useUsersQuery = () => {
  const { setUsers } = useAdmin()
  const query = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => api.get("/usuarios"),
    onSuccess: (data) => {
      setUsers(data.data)
    },
  })
  return query
}
