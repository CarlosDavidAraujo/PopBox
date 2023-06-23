import { useContext, useState, createContext } from "react";
import { getFolderIDBasedOnPath } from "../features/user_folders/utils/getFolderIDBasedOnPath";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState();
  const [currentFolderID, setCurrentFolderID] = useState(null);
  const [currentFolderPath, setCurrentFolderPath] = useState(null);

  const moveOneFolderUp = () => {
    const canMoveUP =
      currentFolderPath && currentFolderPath.split("/").length > 1;
    if (canMoveUP) {
      const newPath = currentFolderPath.split("/").slice(0, -1).join("/"); //remove a ultima parte do caminho atual
      setCurrentFolderPath(newPath);
      // Atualiza o currentFolderID para ser o ID da pasta acima
      const currentFolderID = getFolderIDBasedOnPath(newPath, folders);
      setCurrentFolderID(currentFolderID);
    }
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        currentFolderID,
        setCurrentFolderID,
        currentFolderPath,
        setCurrentFolderPath,
        moveOneFolderUp,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolders = () => useContext(FolderContext);
