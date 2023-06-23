import styled from "styled-components";
import { FcFolder } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { renameFolderPath } from "../utils/renameFolderPath";
import { useFolders } from "../../../contexts/FolderContext";
import { useRenameFolderMutation } from "../hooks/useRenameFolderMutation";
import { adjustFolderName } from "../utils/adjustFolderName";
import { useRef } from "react";
import { useClickOutside } from "../../../shared/hooks/useClickOutside";

export function Folder({ folder }) {
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef();
  const folderRef = useClickOutside(() => setSelectedFolder(null));
  const { user } = useAuth();
  const {
    folders,
    currentFolderID,
    setCurrentFolderID,
    setCurrentFolderPath,
    selectedFolder,
    setSelectedFolder,
  } = useFolders();
  const isInCurrentFolder = folder.diretorio_pai === currentFolderID;

  const { mutate } = useRenameFolderMutation();

  const handleRename = () => {
    const newName = inputRef.current.value;
    const newPath = renameFolderPath(folder.caminho, newName);

    //verifica se o usuario realmente fez alguma alteração no nome da pasta
    if (newPath !== folder.caminho) {
      //ajusta o nome para nao haver repeticao
      const { adjustedName, adjustedPath } = adjustFolderName(
        folders,
        newName,
        newPath
      );

      //envia a requisição para o servidor
      mutate({
        folderID: folder.id,
        userID: user.id,
        caminho: folder.caminho,
        novoCaminho: adjustedPath,
        novoNome: adjustedName,
      });
    }

    setInputActive(false);
  };

  const handleOpenFolder = () => {
    setCurrentFolderID(folder.id);
    setCurrentFolderPath(folder.caminho);
    setSelectedFolder(null);
  };

  const handleSelectFolder = () => {
    setSelectedFolder(folder.id);
  };

  if (!isInCurrentFolder) {
    return null;
  }

  return (
    <Container ref={folderRef} selected={selectedFolder === folder.id}>
      <IconContainer
        onClick={handleSelectFolder}
        onDoubleClick={handleOpenFolder}
      >
        <FcFolder />
      </IconContainer>
      {inputActive ? (
        <RenameInput
          ref={inputRef}
          value={folder.name}
          onBlur={handleRename}
          autoFocus
        />
      ) : (
        <FolderLabel onDoubleClick={() => setInputActive(true)}>
          {folder.nome}
        </FolderLabel>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  background-color: ${(props) => props.selected && "var(--bg)"};
`;

const IconContainer = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  font-size: 8rem;
  color: var(--blue-2);
`;

const FolderLabel = styled.h4`
  max-width: 100px;
  margin-top: -10px;
  font-weight: 400;
  font-size: 18px;
  white-space: nowrap; /* Impede quebra de linha */
  overflow: hidden; /* Oculta o conteúdo excedente */
  text-overflow: ellipsis; /* Exibe reticências para texto truncado */
  text-align: center;
`;

const RenameInput = styled.input`
  max-width: 100px;
  margin-top: -10px;

  font-weight: 400;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
