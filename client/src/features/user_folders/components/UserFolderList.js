import styled from "styled-components";
import { UserFolder } from "./UserFolder";
import { useFolders } from "../../../contexts/FolderContext";
import { api } from "../../../shared/services/api";
import { useQuery } from "react-query";
import { useAuth } from "../../../contexts/AuthContext";

const getDirectories = async userID => {
  const res = await api.get("/diretorios/" + userID);
  return res.data;
};

export function UserFolderList() {
  const { user } = useAuth();
  const { setFolders, folders } = useFolders();
  const { isError, isLoading } = useQuery({
    queryKey: ["folders"],
    queryFn: () => getDirectories(user.id),
    onSuccess: data => {
      setFolders(data);
    },
  });

  if (isLoading) {
    return <h2>Carregando...</h2>;
  }

  if (isError) {
    return <h2>Erro ao buscar diretorios</h2>;
  }

  return (
    <Container>
      {folders?.map((folder, index) => (
        <UserFolder key={index} folder={folder} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
`;
