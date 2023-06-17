const fs = require("fs");
const path = require("path");

function createFolder(folderPath) {
  const projectFolderPath = path.join(__dirname, "../repo"); // Caminho para a pasta "repo" na raiz do projeto
  const userFolderPath = path.join(projectFolderPath, folderPath);

  fs.mkdirSync(userFolderPath);
}

module.exports = createFolder;
