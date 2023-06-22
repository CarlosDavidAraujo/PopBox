import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../shared/services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useFolders } from "../../../contexts/FolderContext";

export const useAddFolderMutation = () => {
  const { setFolders } = useFolders();
  const mutation = useMutation({
    mutationFn: newFolder => api.post("/diretorios/add", newFolder),
    onSuccess: data => {
      setFolders(prevFolders => [...prevFolders, data.data]);
    },
  });
  return mutation;
};
