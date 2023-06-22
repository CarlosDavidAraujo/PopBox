export const adjustFolderName = (userFolders, name, path) => {
  let adjustedName = name;
  let adjustedPath = path;
  let counter = 2;

  while (userFolders.some((folder) => folder.caminho === adjustedPath)) {
    adjustedName = `${name} (${counter})`;
    adjustedPath = `${path} (${counter})`;
    counter++;
  }

  return {
    adjustedName,
    adjustedPath,
  };
};
