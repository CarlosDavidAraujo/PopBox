import styled from "styled-components";
import { Modal } from "../../../../shared/components/modals/Modal";
import { Button } from "../../../../shared/components/buttons/Button";
import { useFolderOptions } from "../../hooks/folders/useFolderOptions";
import { useRef } from "react";

export const RenameModal = ({ isOpen, onClose }) => {
  const inputRef = useRef();
  const { handleFolderRename } = useFolderOptions();
  const handleConfirm = () => {
    handleFolderRename(inputRef.current.value);
    onClose();
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Renomeie a pasta</ModalHeader>
        <ModalBody>
          <Input ref={inputRef} autoFocus />
        </ModalBody>
        <ModalFooter>
          <Button variant="text" color="var(--blue-2)" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            variant="outlined"
            color="var(--blue-2)"
          >
            Renomear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const ModalHeader = styled.p`
  font-size: 24px;
`;

const ModalBody = styled.div``;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  border: 2px solid var(--blue-2);
  background: rgba(217, 217, 217, 0);
`;
