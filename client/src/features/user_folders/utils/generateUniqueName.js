import { normalizeFileName } from "./normalizeFileName";

export const generateUniqueFolderName = (folders, name, parentPath) => {
  // Remove o caractere de barra ("/") do nome pra evitar um caminho errado
  const adjustedName = name.trim().replace(/ +/g, " ").replace(/\//g, "-");
  let uniqueName = adjustedName;
  let uniquePath = `${parentPath}/${uniqueName}`;
  let counter = 2;

  while (folders.some((folder) => folder.caminho === uniquePath)) {
    uniqueName = `${adjustedName}(${counter})`;
    uniquePath = `${parentPath}/${uniqueName}`;
    counter++;
  }

  return { uniqueName, uniquePath };
};

export const generateUniqueFileName = (fileName, parentPath, files) => {
  const normalizedFileName = normalizeFileName(fileName);
  let uniqueName = normalizedFileName;
  let uniquePath = `${parentPath}/${uniqueName}`;
  let counter = 2;

  while (files.some((file) => file.caminho === uniquePath)) {
    const extensionIndex = normalizedFileName.lastIndexOf(".");
    if (extensionIndex >= 0) {
      uniqueName = `${normalizedFileName.slice(
        0,
        extensionIndex
      )}(${counter})${normalizedFileName.slice(extensionIndex)}`;
    } else {
      uniqueName = `${normalizedFileName}(${counter})`;
    }
    uniquePath = `${parentPath}/${uniqueName}`;
    counter++;
  }

  return { uniqueName, uniquePath };
};
