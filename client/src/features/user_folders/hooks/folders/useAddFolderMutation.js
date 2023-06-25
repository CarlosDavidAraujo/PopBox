import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../../shared/services/api";

export const useAddFolderMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newFolder) => api.post("/diretorios/add", newFolder),
    onSuccess: () => {
      queryClient.invalidateQueries("folders");
    },
  });
  return mutation;
};
