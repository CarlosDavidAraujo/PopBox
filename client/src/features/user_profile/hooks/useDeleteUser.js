import { useMutation } from "react-query";
import { api } from "../../../shared/services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigation } from "react-router-dom";

const fetchDelete = (id, credentials) => {
  const res = api.delete(`/usuarios/delete/${id}`, { data: credentials });
  console.log(res);
  return res;
};

export function useDeleteUser() {
  const navigate = useNavigation();
  const { setToken, setUser, user } = useAuth();
  const mutation = useMutation(
    (credentials) => fetchDelete(user.id, credentials),
    {
      onSuccess: () => {
        console.log("sucesso");
        setToken(null);
        setUser(null);
        navigate("/");
      },
    }
  );

  return mutation;
}
