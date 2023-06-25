import { useQuery } from "react-query";
import { api } from "../../../../shared/services/api";
import { useAuth } from "../../../../contexts/AuthContext";
import { useFolders } from "../../../../contexts/FolderContext";

export const useFilesQuery = () => {
  const { user } = useAuth();
  const { setFiles } = useFolders();
  const query = useQuery({
    queryKey: ["files"],
    queryFn: () => api.get(`/arquivos?userID=${user.id}`),
    onSuccess: (data) => {
      setFiles(data.data);
    },
  });
  return query;
};
