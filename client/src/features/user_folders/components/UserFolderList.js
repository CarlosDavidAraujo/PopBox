import styled from "styled-components";
import { UserFolder } from "./UserFolder";

export function UserFolderList() {
  return (
    <Container>
      <UserFolder label='Faculdade'/>
      <UserFolder label='Trabalho'/>
      <UserFolder label='Família'/>
      <UserFolder label='Torrents'/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
`;