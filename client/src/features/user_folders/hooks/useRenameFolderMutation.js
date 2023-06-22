import { useMutation, useQueryClient } from "react-query";
import { useFolders } from "../../../contexts/FolderContext";
import { api } from "../../../shared/services/api";

export function useRenameFolderMutation(folder) {
  const { folders, setFolders } = useFolders();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body) => api.post("/diretorios/rename", body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setFolders((prevFolders) => {
        const index = folders.findIndex((item) => item.id === folder.id);
        const updatedFolders = [...prevFolders];
        updatedFolders[index] = data.data;
        return updatedFolders;
      });
    },
  });
  return mutation;
}
