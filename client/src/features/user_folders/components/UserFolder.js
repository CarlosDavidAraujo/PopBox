import styled from "styled-components";
import { FolderIcon } from "../../../shared/components/FolderIcon";

export function UserFolder({ label }) {
  return (
    <Container>
      <IconContainer>
        <FolderIcon />
      </IconContainer>
      <FolderLabel>{label}</FolderLabel>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

const IconContainer = styled.button`
  width: 202px;
  height: 190px;
  padding: 22px 28px;
  border: none;
  border-radius: 30px;
  cursor: pointer;

  background: var(--bg);
`;

const FolderLabel = styled.h4`
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`;
