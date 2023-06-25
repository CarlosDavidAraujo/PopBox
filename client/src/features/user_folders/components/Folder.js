import styled from "styled-components";
import { FcFolder } from "react-icons/fc";
import { useFolders } from "../../../contexts/FolderContext";
import { FolderDropdown } from "./folder-dropdown-menu/FolderDropdown";

export function Folder({ folderData }) {
  const { currentParentFolder, setCurrentParentFolder } = useFolders();

  const belongsToCurrentParentFolder =
    folderData.diretorio_pai === currentParentFolder?.id;

  const handleOpenFolder = () => {
    setCurrentParentFolder(folderData.id);
  };

  if (!belongsToCurrentParentFolder) {
    return null;
  }

  return (
    <Container>
      <FolderDropdown folderData={folderData} />
      <IconContainer onDoubleClick={handleOpenFolder}>
        <FcFolder />
      </IconContainer>
      <FolderLabel>{folderData.nome}</FolderLabel>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
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
  max-width: 150x;
  margin-top: -10px;
  font-weight: 400;
  font-size: 18px;
  white-space: nowrap; /* Impede quebra de linha */
  overflow: hidden; /* Oculta o conteúdo excedente */
  text-overflow: ellipsis; /* Exibe reticências para texto truncado */
  text-align: center;
`;
