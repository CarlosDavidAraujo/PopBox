import styled from "styled-components";
import { Folder } from "./Folder";
import { useFolders } from "../../../contexts/FolderContext";
import { useFoldersQuery } from "../hooks/folders/useFoldersQuery";
import { useFilesQuery } from "../hooks/files/useFilesQuery";
import { File } from "./File";

export function UserFolderList() {
  const { folders, files } = useFolders();
  const foldersQuery = useFoldersQuery();
  const filesQuery = useFilesQuery();

  if (foldersQuery.isLoading || filesQuery.isLoading) {
    return <h2>Carregando...</h2>;
  }

  if (foldersQuery.isError || filesQuery.isError) {
    return <h2>Erro ao pastas e arquivos</h2>;
  }

  return (
    <Container>
      {folders?.map((folder, i) => (
        <Folder key={i} folderData={folder} />
      ))}
      {files.map((file) => (
        <File key={file.id} fileData={file} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
