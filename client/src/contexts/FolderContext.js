import { useContext, useState, createContext } from "react";
import { getFolderIDBasedOnPath } from "../features/user_folders/utils/getFolderIDBasedOnPath";
import { useAuth } from "./AuthContext";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const { user } = useAuth();
  const [folders, setFolders] = useState();
  const [currentFolderID, setCurrentFolderID] = useState(user?.id);
  const [currentFolderPath, setCurrentFolderPath] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const moveOneFolderUp = () => {
    const canMoveUP = currentFolderID !== user.id;
    if (!canMoveUP) {
      return;
    }
    const newPath = currentFolderPath.split("/").slice(0, -1).join("/"); //remove a ultima parte do caminho atual
    setCurrentFolderPath(newPath);
    // Atualiza o currentFolderID para ser o ID da pasta acima
    const newCurrentFolderID = getFolderIDBasedOnPath(
      newPath,
      folders,
      user.id
    );
    setCurrentFolderID(newCurrentFolderID);
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
        selectedFolder,
        setSelectedFolder,
        moveOneFolderUp,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolders = () => useContext(FolderContext);
