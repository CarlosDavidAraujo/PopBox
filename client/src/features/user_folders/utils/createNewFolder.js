export const createNewFolder = (userID, userFolders, name, path, mutateFn) => {
  let newName = name;
  let newPath = path;
  let counter = 1;

  while (userFolders.some(folder => folder.caminho === newPath)) {
    newName = `${name} (${counter})`;
    newPath = `${path} (${counter})`;
    counter++;
  }

  const newFolder = {
    id: userID,
    nome: newName,
    caminho: newPath,
  };

  mutateFn(newFolder);
};
