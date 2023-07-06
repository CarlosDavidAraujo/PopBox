import styled from "styled-components"
import { useRef } from "react"
import { Modal } from "../../../shared/components/modals/Modal"
import { Button } from "../../../shared/components/buttons/Button"
import { useAdmin } from "../../../contexts/AdminContext"
import { useEditUserMutation } from "../hooks/useEditUserMutation"

export const EditUserModal = ({ isOpen, onClose }) => {
  const inputRef = useRef()
  const { selectedUser } = useAdmin()

  const { mutate } = useEditUserMutation()

  const handleConfirmUserEdition = () => {
    //se o valor nao tiver sido alterado apenas fecha o modal
    if (inputRef.current.value === selectedUser?.cota) {
      onClose()
      return
    }
    mutate({ userID: selectedUser?.id, cota: inputRef.current.value })
    onClose()
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Editar usuario: {selectedUser?.id}</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            min={100}
            max={500}
            ref={inputRef}
            placeholder={`Cota: ${selectedUser?.cota}`}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="text" color="var(--blue-2)" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmUserEdition}
            variant="outlined"
            color="var(--blue-2)"
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

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  border: 2px solid var(--blue-2);
  background: rgba(217, 217, 217, 0);
`
