import styled from "styled-components";
import { IconContext } from "react-icons";
import {
  HiOutlineFolderPlus,
  HiOutlineFolderArrowDown,
  HiOutlineFolderMinus,
  HiOutlineDocumentArrowUp,
} from "react-icons/hi2";
import { useAddFolderMutation } from "../hooks/useAddFolderMutation";
import { useAuth } from "../../../contexts/AuthContext";
import { createNewFolder } from "../utils/createNewFolder";
import { useFolders } from "../../../contexts/FolderContext";

export function FolderOptions() {
  const { user } = useAuth();
  const { folders } = useFolders();
  const { mutate } = useAddFolderMutation();
  const handleFolderCreation = () => {
    createNewFolder(user.id, folders, "nova pasta", "/nova pasta", mutate);
  };
  return (
    <Container>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <MenuItem onClick={handleFolderCreation}>
          {<HiOutlineFolderPlus />}Nova pasta
        </MenuItem>
        <MenuItem>{<HiOutlineDocumentArrowUp />}Novo arquivo</MenuItem>
        <MenuItem>{<HiOutlineFolderArrowDown />} Baixar seleção</MenuItem>
        <MenuItem>{<HiOutlineFolderMinus />}Excluir seleção</MenuItem>
      </IconContext.Provider>
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
