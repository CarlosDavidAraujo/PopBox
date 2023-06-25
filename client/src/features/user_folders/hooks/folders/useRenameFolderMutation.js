import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../../shared/services/api";

export function useRenameFolderMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body) => api.post("/diretorios/rename", body),
    onSuccess: () => {
      queryClient.invalidateQueries("folders");
    },
  });
  return mutation;
}
