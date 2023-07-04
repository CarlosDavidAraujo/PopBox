const fs = require("fs");
const { basePath } = require("../utils/basePath");
const User = require("../models/User");
const File = require("../models/File");

module.exports.create = async (req, res) => {
  try {
    const { userID, diretorio_pai, caminho } = req.body;
    const file = req.file;

    const user = await User.findByPk(userID);

    // Cria o arquivo no repositorio
    const path = basePath + caminho;
    fs.writeFileSync(path, file.buffer);

    await user.createFile({
      nome: file.originalname,
      mime_type: file.mimetype,
      tamanho: file.size,
      caminho,
      diretorio_pai,
    });

    res.status(200).json("Arquivo adicionado");
  } catch (err) {
    console.log("Erro ao adicionar arquivo", err);
    res.status(500).json("Erro ao adicionar arquivo");
  }
};

exports.findAll = async (req, res) => {
  try {
    const { userID } = req.query;
    const files = await File.findAll({
      where: {
        proprietario: userID,
      },
    });

    res.status(200).json(files);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao buscar arquivos" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id, caminho } = req.query;
    const filePath = `${basePath}${caminho}`;

    fs.unlinkSync(filePath);

    await File.destroy({
      where: {
        id,
      },
    });

    res.status(200).json("arquivo removida");
  } catch (err) {
    console.log(err);
    res.status(500).json("Houve um erro ao excluir o arquivo!");
  }
};

exports.rename = async (req, res) => {
  try {
    const { fileID, caminhoAtual, novoCaminho, novoNome } = req.body;

    const oldePath = basePath + caminhoAtual;
    const newPath = basePath + novoCaminho;

    const file = await File.findByPk(fileID);

    fs.renameSync(oldePath, newPath);

    await file.update({
      nome: novoNome,
      caminho: novoCaminho,
    });
    res.status(200).json("arquivo renomeado com sucesso");
  } catch (err) {
    console.log("Erro ao renomear arquivo", err);
    res.status(500).json("Erro ao renomear arquivo");
  }
};

exports.download = async (req, res) => {
  try {
    const { caminho } = req.query;

    const filePath = `${basePath}${caminho}`;

    // Verifica se o arquivo existe antes de fazer o download
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ erro: "Arquivo não encontrado" });
    }
    console.log(filePath);
    res.download(filePath); // Envia o arquivo para download
  } catch (err) {
    console.log(err);
    res.status(500).json("Houve um erro ao baixar o arquivo");
  }
};
