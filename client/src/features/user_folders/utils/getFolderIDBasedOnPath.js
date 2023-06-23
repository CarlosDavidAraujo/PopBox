export const getFolderIDBasedOnPath = (path, folders, rootFolderID) => {
  // Verifica se o caminho não está vazio
  if (path) {
    // Divide o caminho em partes separadas por "/"
    const pathParts = path.split("/");

    // Obtém o nome da pasta mais alta (último elemento do caminho)
    const highestFolderName = pathParts[pathParts.length - 1];

    // Filtra as pastas para encontrar a pasta superior com base no nome
    const highestFolder = folders.find(
      (folder) => folder.nome === highestFolderName
    );

    // Retorna o ID da pasta superior ou null se não encontrada
    return highestFolder ? highestFolder.id : rootFolderID;
  }

  return rootFolderID;
};
