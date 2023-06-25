import styled from "styled-components";
import { IconContext } from "react-icons";
import { HiOutlineFolderPlus, HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { useRef } from "react";
import { AddFolderModal } from "./folder-modals/AddFolderModal";
import { useToggle } from "../../../shared/hooks/useToggle";
import { useFileOptions } from "../hooks/files/useFileOptions";

export function FolderOptions() {
  const fileInputRef = useRef();
  const { handleFileUpload } = useFileOptions();
  const {
    state: isAddFolderModalOpen,
    setOn: openAddFolderModal,
    setOff: closeAddFolderModal,
  } = useToggle();

  return (
    <Container>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <MenuItem onClick={openAddFolderModal}>
          {<HiOutlineFolderPlus />}Nova pasta
        </MenuItem>
        <MenuItem>
          {<HiOutlineDocumentArrowUp />}
          Novo arquivo
          <FileInput
            ref={fileInputRef}
            type="file"
            onChange={() => handleFileUpload(fileInputRef)}
          />
        </MenuItem>
      </IconContext.Provider>
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={closeAddFolderModal}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const MenuItem = styled.button`
  position: relative;
  height: 64px;
  border-radius: 0px 30px 30px 0px;
  padding: 9px 27px;
  border: none;
  display: flex;
  align-items: center;
  gap: 26px;
  cursor: pointer;

  background-color: var(--bg);

  font-family: inherit;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--blue-2);
    color: var(--bg);
  }
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: red;
  opacity: 0;
  cursor: pointer;
`;
