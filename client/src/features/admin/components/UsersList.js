import styled from "styled-components";
import { useUsersStore } from "../../../stores/useUsersStore";
import { useUsersQuery } from "../hooks/useUsersQuery";

export function UsersList() {
  //const setUsers = useUsersStore((state) => state.setUsers);
  const { data, isError, isLoading } = useUsersQuery();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Houve um erro ao carrgar a lista de usuários</p>;
  }

  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <th>#</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Cota</th>
            <th>Ações</th>
          </TableRow>
        </thead>
        <tbody>
          {data.data.map((user) => (
            <TableRow>
              <TableData>{user.id}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.senha}</TableData>
              <TableData>{user.cota}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  width: max-content;
`;

const Table = styled.table`
  border: 1px solid lightgray;
  border-collapse: collapse;
  border-radius: 5px;
`;

const TableRow = styled.tr`
  padding: 5px;
  border-bottom: 1px solid lightgray;
`;

const TableData = styled.td`
  padding: 5px;
`;
