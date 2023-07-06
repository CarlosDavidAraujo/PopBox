import { LuTrash, LuEdit } from "react-icons/lu"
import styled from "styled-components"
import { useAdmin } from "../../../contexts/AdminContext"
import { EditUserModal } from "./EditUserModal"
import { useToggle } from "../../../shared/hooks/useToggle"
import { RemoveUserModal } from "./RemoveUserModal"

export const AdminActions = ({ user }) => {
  const { setSelectedUser } = useAdmin()
  const {
    state: isEditModalOpen,
    setOff: closeEditModal,
    setOn: openEditModal,
  } = useToggle()

  const {
    state: isRemoveModalOpen,
    setOff: closeRemoveModal,
    setOn: openRemoveModal,
  } = useToggle()

  const handleOpenEditModal = () => {
    setSelectedUser(user)
    openEditModal()
  }

  const handleCloseEditModal = () => {
    setSelectedUser(null)
    closeEditModal()
  }

  const handleOpenRemoveModal = () => {
    setSelectedUser(user)
    openRemoveModal()
  }

  const handleCloseRemoveModal = () => {
    setSelectedUser(null)
    closeRemoveModal()
  }

  return (
    <Options>
      <LuEdit onClick={handleOpenEditModal} />
      <LuTrash onClick={handleOpenRemoveModal} />
      <EditUserModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} />
      <RemoveUserModal
        isOpen={isRemoveModalOpen}
        onClose={handleCloseRemoveModal}
      />
    </Options>
  )
}

const Options = styled.div`
  display: flex;
  gap: 20px;
  color: var(--blue-2);

  svg {
    cursor: pointer;
  }
`
