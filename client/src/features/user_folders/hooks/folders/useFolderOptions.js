import { useAuth } from "../../../../contexts/AuthContext";
import { useFolders } from "../../../../contexts/FolderContext";
import { useRenameFolderMutation } from "./useRenameFolderMutation";
import { generateUniqueFolderName } from "../../utils/generateUniqueName";
import { useDeleteFolderMutation } from "./useDeleteFolderMutation";
import { useAddFolderMutation } from "./useAddFolderMutation";

export const useFolderOptions = () => {
  const { user } = useAuth();
  const { folders, selectedFolder, currentParentFolder } = useFolders();
  const renameMutation = useRenameFolderMutation();
  const createMutation = useAddFolderMutation();
  const deleteMutation = useDeleteFolderMutation();

  const handleFolderCreation = (folderName) => {
    const { uniqueName, uniquePath } = generateUniqueFolderName(
      folders,
      folderName,
      currentParentFolder.caminho
    );

    createMutation.mutate({
      userID: user.id,
      nome: uniqueName,
      caminho: uniquePath,
      diretorio_pai: currentParentFolder.id,
    });
  };

  const handleFolderRename = (newName) => {
    //sai da funçao se nao houver alteraçao do nome
    if (newName === selectedFolder.nome) {
      return;
    }
    //ajusta o nome e o caminho para nao haver repeticao
    const { uniqueName, uniquePath } = generateUniqueFolderName(
      folders,
      newName,
      currentParentFolder.caminho
    );
    //envia a requisição para o servidor
    renameMutation.mutate({
      folderID: selectedFolder.id,
      caminho: selectedFolder.caminho,
      novoNome: uniqueName,
      novoCaminho: uniquePath,
    });
  };

  const handleFolderDelete = () => {
    deleteMutation.mutate({
      id: selectedFolder.id,
      caminho: selectedFolder.caminho,
    });
  };

  return { handleFolderCreation, handleFolderRename, handleFolderDelete };
};
