import styled from "styled-components"
import { useFileOptions } from "../../hooks/files/useFileOptions"
import { Modal } from "../../../../shared/components/modals/Modal"
import { Button } from "../../../../shared/components/buttons/Button"

export const DeleteFileModal = ({ isOpen, onClose }) => {
  const { handleFileDelete } = useFileOptions()

  const handleConfirm = () => {
    handleFileDelete()
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Deseja excluir este arquivo?</ModalHeader>
        <ModalBody></ModalBody>
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
  )
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`

const ModalHeader = styled.p`
  font-size: 24px;
`

const ModalBody = styled.div``

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`
