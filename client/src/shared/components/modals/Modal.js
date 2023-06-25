import styled from "styled-components";

export const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Container>
      <ModalChild>{children}</ModalChild>
      <ModalOverlay />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 3000;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalChild = styled.div`
  z-index: 2000;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.2;
  pointer-events: none;
`;
