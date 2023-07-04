import { useQuery } from "react-query";
import { api } from "../../../shared/services/api";
import { useUsersStore } from "../../../stores/useUsersStore";

export const useUsersQuery = () => {
  const query = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => api.get("/usuarios"),
    onSuccess: (data) => {
      console.log(data.data);
    },
  });
  return query;
};
