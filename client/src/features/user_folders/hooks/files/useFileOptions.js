import { useAuth } from "../../../../contexts/AuthContext";
import { useFolders } from "../../../../contexts/FolderContext";
import { generateUniqueFileName } from "../../utils/generateUniqueName";
import { normalizeFile } from "../../utils/normalizeFile";
import { useDeleteFileMutation } from "./useDeleteFileMutation";
import { useRenameFileMutation } from "./useRenameFileMutation";
import { useUploadFileMutation } from "./useUploadFileMutation";

export const useFileOptions = () => {
  const { user } = useAuth();
  const { folders, files, currentParentFolder, selectedFile } = useFolders();
  const uploadMutation = useUploadFileMutation();
  const deleteMutation = useDeleteFileMutation();
  const renameMutation = useRenameFileMutation();

  const handleFileUpload = (fileRef) => {
    const file = fileRef.current.files[0];

    if (file) {
      const { normalizedFile, uniquePath } = normalizeFile(
        file,
        currentParentFolder.caminho,
        folders
      );
      const formData = new FormData();
      formData.append("file", normalizedFile);
      formData.append("userID", user.id);
      formData.append("diretorio_pai", currentParentFolder.id);
      formData.append("caminho", uniquePath);
      uploadMutation.mutate(formData);

      // Limpa o campo de upload
      fileRef.current.value = null;
    }
  };

  const handleFileDelete = () => {
    deleteMutation.mutate({
      id: selectedFile.id,
      caminho: selectedFile.caminho,
    });
  };

  const handleFileRename = (newName) => {
    const { uniqueName, uniquePath } = generateUniqueFileName(
      newName,
      selectedFile.mime_type,
      currentParentFolder.caminho,
      files
    );

    renameMutation.mutate({
      fileID: selectedFile.id,
      caminhoAtual: selectedFile.caminho,
      novoCaminho: uniquePath,
      novoNome: uniqueName,
    });
  };

  return { handleFileUpload, handleFileDelete, handleFileRename };
};
