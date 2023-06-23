import styled from "styled-components";
import { VscTriangleUp } from "react-icons/vsc";
import { useFolders } from "../../../contexts/FolderContext";

export function FolderNavigator() {
  const { currentFolderPath, moveOneFolderUp } = useFolders();

  return (
    <Container>
      <UpButton onClick={moveOneFolderUp}>
        <VscTriangleUp />
      </UpButton>
      <PathContainer>
        {currentFolderPath ? `${currentFolderPath}` : "/"}
      </PathContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const UpButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 10px;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  background-color: var(--blue-3);
  color: white;
  font-size: 3rem;

  &:hover {
    background-color: var(--blue-2);
  }
  &:active {
    filter: brightness(1.2);
  }
`;

const PathContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 13px;
  background-color: var(--blue-3);
  color: white;
  font-size: 33px;
`;
