import { useContext, useState, createContext, useMemo, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [currentParentFolder, _setCurrentParentFolder] = useState(null);
  const [selectedFolder, _setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, _setSelectedFile] = useState(null);

  const setCurrentParentFolder = (folderID) => {
    const parent = folders.find((folder) => folder.id === folderID);
    _setCurrentParentFolder(parent);
  };

  const setSelectedFolder = (folderID) => {
    const selected = folders.find((folder) => folder.id === folderID);
    _setSelectedFolder(selected);
  };

  const setSelectedFile = (fileID) => {
    const selected = files.find((file) => file.id === fileID);
    _setSelectedFile(selected);
  };

  const moveOneFolderUp = () => {
    //o diretorio raiz do usuario tem um nome igual ao uuid do usuario
    const canMoveUP = currentParentFolder.nome !== user.uuid;
    if (!canMoveUP) {
      return;
    }
    const newParent = folders.find(
      (folder) => folder.id === currentParentFolder.diretorio_pai
    );
    setCurrentParentFolder(newParent.id);
  };

  const resetFolderContext = () => {
    setFolders([]);
    setCurrentParentFolder(null);
    _setSelectedFolder(null);
    setFiles([]);
    _setSelectedFile(null);
  };

  //seta inicialmente a pasta incial como sendoa  pasta raiz do usuario, no momento em que o componente for renderizado
  useEffect(() => {
    if (folders.length > 0 && !currentParentFolder) {
      setCurrentParentFolder(folders[0].id);
    }
  }, [folders, currentParentFolder]);

  const contextValue = useMemo(
    () => ({
      folders,
      setFolders,
      files,
      setFiles,
      selectedFile,
      setSelectedFile,
      currentParentFolder,
      setCurrentParentFolder,
      selectedFolder,
      setSelectedFolder,
      moveOneFolderUp,
      resetFolderContext,
    }),
    [folders, files, selectedFile, currentParentFolder, selectedFolder]
  );

  return (
    <FolderContext.Provider value={contextValue}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolders = () => useContext(FolderContext);
