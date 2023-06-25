import { appendFileExtension } from "./appendFileExtension";
import { normalizeFileName } from "./normalizeFileName";

export const generateUniqueFolderName = (folders, name, parentPath) => {
  // Remove o caractere de barra ("/") do nome pra evitar um caminho errado
  const adjustedName = name.trim().replace(/ +/g, " ").replace(/\//g, "-");
  let uniqueName = adjustedName;
  let uniquePath = `${parentPath}/${uniqueName}`;
  let counter = 2;

  while (folders.some((folder) => folder.caminho === uniquePath)) {
    uniqueName = `${adjustedName} (${counter})`;
    uniquePath = `${parentPath}/${uniqueName}`;
    counter++;
  }

  return { uniqueName, uniquePath };
};

export const generateUniqueFileName = (
  fileName,
  mimeType,
  parentPath,
  files
) => {
  // Remove o caractere de barra ("/") do nome pra evitar um caminho errado
  const adjustedName = normalizeFileName(fileName);
  let uniqueName = appendFileExtension(mimeType, adjustedName);
  let uniquePath = `${parentPath}/${uniqueName}`;
  let counter = 2;

  while (files.some((file) => file.caminho === uniquePath)) {
    uniqueName = `${adjustedName} (${counter})`;
    uniquePath = `${parentPath}/${uniqueName}`;
    counter++;
  }

  return { uniqueName, uniquePath };
};
