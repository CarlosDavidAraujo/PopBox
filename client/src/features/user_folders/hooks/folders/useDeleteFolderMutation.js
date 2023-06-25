import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../../shared/services/api";

export const useDeleteFolderMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (params) =>
      api.delete(
        `/diretorios/delete?id=${params.id}&caminho=${params.caminho}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("folders");
    },
  });
  return mutation;
};
