import { useContext, useState, createContext } from "react";
import { useAuth } from "./AuthContext";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState();

  return (
    <FolderContext.Provider value={{ folders, setFolders }}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolders = () => useContext(FolderContext);