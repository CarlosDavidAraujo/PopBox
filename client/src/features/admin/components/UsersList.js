import styled from "styled-components"
import { useUsersQuery } from "../hooks/useUsersQuery"
import { AdminActions } from "./AdminActions"

export function UsersList() {
  const { data, isError, isLoading } = useUsersQuery()

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (isError) {
    return <p>Houve um erro ao carrgar a lista de usuários</p>
  }

  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead>Cota</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </thead>
        <TableBody>
          {data.data.map(
            (user) =>
              !user.administrador && (
                <TableRow>
                  <TableData>{user.id}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.senha}</TableData>
                  <TableData>{user.cota} Mb</TableData>
                  <TableData>
                    <AdminActions user={user} />
                  </TableData>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
  width: max-content;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  overflow: hidden;
`

const Table = styled.table`
  border-collapse: collapse;
  // width: 100%;
`

const TableBody = styled.tbody`
  > tr:nth-last-child(1) {
    border: none;
  }
`

const TableRow = styled.tr`
  border-bottom: 1px solid lightgray;
  background-color: white;
`

const TableHead = styled.th`
  padding: 10px;
  background-color: var(--blue-2);
  color: white;
  text-align: start;
`

const TableData = styled.td`
  padding: 10px;
`
