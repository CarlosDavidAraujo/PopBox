import { generateUniqueFolderName } from "./generateUniqueName";

export function normalizeFile(file, parentPath, folders) {
  const normalizedName = file.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");
  const { uniqueName, uniquePath } = generateUniqueFolderName(
    folders,
    normalizedName,
    parentPath
  );
  const normalizedFile = new File([file], uniqueName, {
    type: file.type,
  });
  return { normalizedFile, uniquePath };
}
