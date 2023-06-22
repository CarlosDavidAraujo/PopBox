import { useContext, useState, createContext } from "react";
import { useAuth } from "./AuthContext";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState();
  const { user } = useAuth();
  const [currentFolder, setCurrentFolder] = useState(null);

  return (
    <FolderContext.Provider
      value={{ folders, setFolders, currentFolder, setCurrentFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolders = () => useContext(FolderContext);
