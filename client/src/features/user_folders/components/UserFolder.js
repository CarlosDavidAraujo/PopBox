import styled from "styled-components";
import { FolderIcon } from "../../../shared/components/FolderIcon";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { IconContext } from "react-icons";

export function UserFolder({ label }) {
  return (
    <Container>
      <IconContainer>
        <IconContext.Provider value={{size: '10em', color: 'var(--blue-2)'}}>
          <HiOutlineFolderOpen />
        </IconContext.Provider>
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
  width: 150px;
  height: 150px;
  padding: 22px 28px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--bg);
`;

const FolderLabel = styled.h4`
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`;
