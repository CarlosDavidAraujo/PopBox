import { useQuery } from "react-query";
import { api } from "../../../../shared/services/api";
import { useFolders } from "../../../../contexts/FolderContext";
import { useAuth } from "../../../../contexts/AuthContext";

export const useFoldersQuery = () => {
  const { user } = useAuth();
  const { setFolders } = useFolders();
  const query = useQuery({
    queryKey: ["folders"],
    queryFn: () => api.get("/diretorios/" + user.id),
    onSuccess: (data) => {
      setFolders(data.data);
    },
  });
  return query;
};
