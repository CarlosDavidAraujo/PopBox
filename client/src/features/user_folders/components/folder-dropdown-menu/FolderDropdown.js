import styled from "styled-components"
import {
  MdMoreVert,
  MdDriveFileRenameOutline,
  MdDelete,
  MdDownload,
} from "react-icons/md"
import { useClickOutside } from "../../../../shared/hooks/useClickOutside"
import { useToggle } from "../../../../shared/hooks/useToggle"
import { RenameModal } from "../folder-modals/RenameModal"
import { useFolders } from "../../../../contexts/FolderContext"
import { DeleteModal } from "../folder-modals/DeleteModal"

export const FolderDropdown = ({ folderData }) => {
  const { setSelectedFolder } = useFolders()
  const {
    state: isDropdownOpen,
    setOff: closeDropdown,
    toggle: toggleDropdown,
  } = useToggle()
  const {
    state: isRenameModalOpen,
    setOn: openRenameModal,
    setOff: closeRenameModal,
  } = useToggle()
  const {
    state: isDeleteModalOpen,
    setOn: openDeleteModal,
    setOff: closeDeleteModal,
  } = useToggle()
  const dropdownRef = useClickOutside(closeDropdown)

  const handleDropdownToggle = () => {
    toggleDropdown()
    setSelectedFolder(folderData.id)
  }

  return (
    <>
      <Container ref={dropdownRef}>
        <DropdownMenuButton onClick={handleDropdownToggle}>
          <MdMoreVert />
        </DropdownMenuButton>
        {isDropdownOpen && (
          <DropdownContent>
            <DropdownButton onClick={openRenameModal}>
              <MdDriveFileRenameOutline />
              Renomear
            </DropdownButton>
            <DropdownButton onClick={openDeleteModal}>
              <MdDelete />
              Deletar
            </DropdownButton>
          </DropdownContent>
        )}
      </Container>
      <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
      <RenameModal isOpen={isRenameModalOpen} onClose={closeRenameModal} />
    </>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
`

const DropdownMenuButton = styled.button`
  position: relative;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 20px;
  font-size: 30px;
  color: var(--blue-2);
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: var(--bg);
  }
`

const DropdownContent = styled.div`
  position: absolute;
  width: 200px;
  border-radius: 5px;
  padding: 5px;
  box-shadow: var(--shadow);
  background-color: var(--bg);
`

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  font-family: inherit;
  font-size: 18px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: var(--blue-2);
    color: white;
  }
`
