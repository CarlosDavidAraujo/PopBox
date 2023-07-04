import { useAuth } from "../../../../contexts/AuthContext";
import { useFolders } from "../../../../contexts/FolderContext";
import { appendFileExtension } from "../../utils/appendFileExtension";
import { generateUniqueFileName } from "../../utils/generateUniqueName";
import { useDeleteFileMutation } from "./useDeleteFileMutation";
import { useRenameFileMutation } from "./useRenameFileMutation";
import { useUploadFileMutation } from "./useUploadFileMutation";

export const useFileOptions = () => {
  const { user } = useAuth();
  const { files, currentParentFolder, selectedFile } = useFolders();
  const uploadMutation = useUploadFileMutation();
  const deleteMutation = useDeleteFileMutation();
  const renameMutation = useRenameFileMutation();

  const handleFileUpload = (fileRef) => {
    const file = fileRef.current.files[0];

    if (file) {
      const { uniqueName, uniquePath } = generateUniqueFileName(
        file.name,
        currentParentFolder.caminho,
        files
      );
      const normalizedFile = new File([file], uniqueName, {
        type: file.type,
      });
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
    const newNameWithExtension = appendFileExtension(
      selectedFile.mime_type,
      newName
    );

    const { uniqueName, uniquePath } = generateUniqueFileName(
      newNameWithExtension,
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
  const handleFileDownload = async () => {
    const response = await fetch(
      `http://localhost:3002/arquivos/download?caminho=${selectedFile.caminho}`
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedFile.nome; // Define o nome do arquivo no momento do download
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    handleFileUpload,
    handleFileDelete,
    handleFileRename,
    handleFileDownload,
  };
};
