import { useState, useEffect } from "react";
import { useFolders } from "../../../../contexts/FolderContext";

const editPath = (path) => {
  const pathParts = path.split("/");
  const editedPath = pathParts.slice(2).join("/");
  return `/${editedPath}`;
};

export const useNavigator = () => {
  const [path, setPath] = useState();
  const { currentParentFolder, moveOneFolderUp } = useFolders();

  useEffect(() => {
    if (currentParentFolder) {
      const newPath = editPath(currentParentFolder.caminho);
      setPath(newPath);
    }
  }, [currentParentFolder]);

  return { path, moveOneFolderUp };
};
