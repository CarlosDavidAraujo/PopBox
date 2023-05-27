import styled from "styled-components";
import { UploadIcon } from "../../../shared/components/UploadIcon";
import { AddIcon } from "../../../shared/components/AddIcon";
import { TrashIcon } from "../../../shared/components/TrashIcon";

export function FooterMenu() {
  return (
    <Container>
      <Button>
        <UploadIcon />
      </Button>
      <Button>
        <AddIcon />
      </Button>
      <Button>
        <TrashIcon />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 416px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  width: 108px;
  height: 108px;
  aspect-ratio: 1;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--bg-2);
`;
