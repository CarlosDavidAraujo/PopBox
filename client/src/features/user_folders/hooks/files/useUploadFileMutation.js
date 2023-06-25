import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../../shared/services/api";

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData) =>
      api.post("/arquivos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("files");
    },
  });
  return mutation;
};
