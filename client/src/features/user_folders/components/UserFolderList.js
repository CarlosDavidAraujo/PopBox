import styled from "styled-components";
import { Folder } from "./Folder";
import { useFolders } from "../../../contexts/FolderContext";
import { api } from "../../../shared/services/api";
import { useQuery } from "react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { File } from "./File";

export function UserFolderList() {
  const { user } = useAuth();
  const { setFolders, folders } = useFolders();
  const { isError, isLoading } = useQuery({
    queryKey: ["folders"],
    queryFn: () => api.get("/diretorios/" + user.id),
    onSuccess: (data) => {
      setFolders(data.data);
    },
  });

  if (isLoading) {
    return <h2>Carregando...</h2>;
  }

  if (isError) {
    return <h2>Erro ao buscar diretorios</h2>;
  }

  console.log(folders);
  return (
    <Container>
      {folders?.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
      {folders
        ?.flatMap((folder) => folder.files)
        .map((file) => (
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
