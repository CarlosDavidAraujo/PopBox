import styled from "styled-components";
import { FcFolder } from "react-icons/fc";
import { IconContext } from "react-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { api } from "../../../shared/services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { renameFolderPath } from "../utils/renameFolderPath";
import { useFolders } from "../../../contexts/FolderContext";

export function UserFolder({ folder }) {
  const { folders, setFolders } = useFolders();
  const [inputActive, setInputActive] = useState(false);
  const [folderName, setFolderName] = useState(folder.nome);

  const mutation = useMutation({
    mutationFn: () =>
      api.post("/diretorios/rename", {
        id: folder.id,
        caminho: folder.caminho,
        novoCaminho: renameFolderPath(folder.caminho, folderName),
        novoNome: folderName,
      }),
    onSuccess: data => {
      setFolders(prevFolders => {
        const index = folders.findIndex(item => item.id === folder.id);
        console.log(data);
        return [...prevFolders, (prevFolders[index] = data.data)];
      });
    },
  });

  const handleChange = e => {
    const { value } = e.target;
    setFolderName(value);
  };

  const handleRename = () => {
    setInputActive(false);
    mutation.mutate();
  };

  return (
    <Container>
      <IconContainer>
        <IconContext.Provider value={{ size: "8em", color: "var(--blue-2)" }}>
          <FcFolder />
        </IconContext.Provider>
      </IconContainer>
      {inputActive ? (
        <RenameInput
          value={folderName}
          onChange={handleChange}
          onBlur={handleRename}
          autoFocus
        />
      ) : (
        <FolderLabel onDoubleClick={() => setInputActive(true)}>
          {folder.nome}
        </FolderLabel>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
`;

const FolderLabel = styled.h4`
  margin-top: -10px;
  font-weight: 400;
  font-size: 18px;
  white-space: nowrap; /* Impede quebra de linha */
  overflow: hidden; /* Oculta o conteúdo excedente */
  text-overflow: ellipsis; /* Exibe reticências para texto truncado */
`;

const RenameInput = styled.input`
  width: 100%;
  margin-top: -10px;

  font-weight: 400;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
