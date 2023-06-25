import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../../shared/services/api";

export const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (params) =>
      api.delete(`/arquivos/delete?id=${params.id}&caminho=${params.caminho}`),
    onSuccess: () => {
      queryClient.invalidateQueries("files");
    },
  });
  return mutation;
};
