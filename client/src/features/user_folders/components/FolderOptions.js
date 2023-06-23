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
import { adjustFolderName } from "../utils/adjustFolderName";
import { useFolders } from "../../../contexts/FolderContext";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../shared/services/api";
import { normalizeFile } from "../utils/normalizeFile";

export function FolderOptions() {
  const { user } = useAuth();
  const { mutate } = useAddFolderMutation();
  const fileInputRef = useRef();
  const { folders, currentFolderPath, currentFolderID } = useFolders();
  const queryClient = useQueryClient();

  const handleFolderCreation = () => {
    const { adjustedName, adjustedPath } = adjustFolderName(
      folders,
      "nova pasta",
      currentFolderPath ? `${currentFolderPath}/nova pasta` : "/nova pasta"
    );
    mutate({
      userID: user.id,
      nome: adjustedName,
      caminho: adjustedPath,
      diretorio_pai: currentFolderID,
    });
  };

  const uploadMutation = useMutation({
    mutationFn: (formData) =>
      api.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "folders" });
    },
  });

  const handleFileUpload = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const normalizedFile = normalizeFile(file);
      const formData = new FormData();
      const filePath = currentFolderPath
        ? `${currentFolderPath}/${normalizedFile.name}`
        : `/${normalizedFile.name}`;
      formData.append("file", normalizedFile);
      formData.append("userID", user.id); // Substitua "userID" pelo valor correto
      formData.append("diretorio_pai", currentFolderID); // Substitua "dirID" pelo valor correto
      formData.append("caminho", filePath);
      uploadMutation.mutate(formData);

      // Limpa o campo de upload
      fileInputRef.current.value = null;
    }
  };

  /* const handleDeleteFolder = () => {
    console.log(selectedFolder, "deletado");
  }; */

  return (
    <Container>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <MenuItem onClick={handleFolderCreation}>
          {<HiOutlineFolderPlus />}Nova pasta
        </MenuItem>
        <MenuItem>
          {<HiOutlineDocumentArrowUp />}
          Novo arquivo
          <FileInput
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
          />
        </MenuItem>
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
