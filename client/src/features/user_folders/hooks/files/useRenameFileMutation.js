import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../../shared/services/api";

export const useRenameFileMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body) => api.put("/arquivos/rename", body),
    onSuccess: () => {
      queryClient.invalidateQueries("files");
    },
  });
  return mutation;
};
