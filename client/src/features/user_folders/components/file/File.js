import styled from "styled-components";
import { useFolders } from "../../../../contexts/FolderContext";
import { AiFillFileUnknown } from "react-icons/ai";
import { FileDropdown } from "../file-dropdown-menu/FileDropdown";
import { useFileIcons } from "./useFileIcons";

export function File({ fileData }) {
  const { currentParentFolder } = useFolders();
  const icon = useFileIcons(fileData.mime_type);
  const belongsToCurrentParentFolder =
    fileData.diretorio_pai === currentParentFolder?.id;
  if (!belongsToCurrentParentFolder) {
    return null;
  }

  return (
    <Container>
      <FileDropdown fileData={fileData} />
      <IconContainer>{icon}</IconContainer>
      <FileLabel>{fileData.nome}</FileLabel>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;

  background-color: ${(props) => props.selected && "var(--bg)"};
`;

const IconContainer = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  background-color: transparent;
  font-size: 7rem;
  color: var(--blue-2);
`;

const FileLabel = styled.h4`
  max-width: 150px;
  font-weight: 400;
  font-size: 18px;
  white-space: nowrap; /* Impede quebra de linha */
  overflow: hidden; /* Oculta o conteúdo excedente */
  text-overflow: ellipsis; /* Exibe reticências para texto truncado */
`;
