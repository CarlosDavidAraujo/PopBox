import styled from "styled-components"
import { Modal } from "../../../shared/components/modals/Modal"
import { Button } from "../../../shared/components/buttons/Button"
import { useAdmin } from "../../../contexts/AdminContext"
import { useDeleteUserMutation } from "../hooks/useDeleteUserMutation"

export const RemoveUserModal = ({ isOpen, onClose }) => {
  const { selectedUser } = useAdmin()
  const { mutate } = useDeleteUserMutation(selectedUser?.id)

  const handleConfirmUserExclusion = () => {
    mutate()
    onClose()
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Excluir usuario: {selectedUser?.id}</ModalHeader>
        <ModalBody>
          Tem certeza que deseja excluir este usuário? Esta ação é irreversível!
        </ModalBody>
        <ModalFooter>
          <Button variant="outlined" color="var(--blue-2)" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmUserExclusion}
            textColor="white"
            color="var(--danger)"
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`

const ModalHeader = styled.p`
  font-size: 24px;
`

const ModalBody = styled.div`
  margin: 20px 0;
  font-size: 1.5rem;
  font-weight: 700;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`
