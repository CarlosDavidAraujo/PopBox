import styled from "styled-components";
import { Modal } from "../../../../shared/components/modals/Modal";
import { Button } from "../../../../shared/components/buttons/Button";
import { useState } from "react";
import { useFolders } from "../../../../contexts/FolderContext";
import { useFolderOptions } from "../../hooks/folders/useFolderOptions";

export const DeleteModal = ({ isOpen, onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { folders, selectedFolder } = useFolders();
  const { handleFolderDelete } = useFolderOptions();

  const notEmpty = () =>
    folders.some((folder) => folder.diretorio_pai === selectedFolder.id);

  const handleConfirm = () => {
    if (notEmpty()) {
      return setErrorMessage(
        "Não foi possível deletar a pasta. Verifique se ela está vazia!"
      );
    }
    handleFolderDelete();
    onClose();
  };

  const handleClose = () => {
    setErrorMessage("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Deseja excluir esta pasta?</ModalHeader>
        <ModalBody>{errorMessage && errorMessage}</ModalBody>
        <ModalFooter>
          <Button color="var(--blue-2)" textColor="white" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} variant="text" color="var(--danger)">
            Excluir
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
