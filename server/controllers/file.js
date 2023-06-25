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
    fs.writeFile(path, file.buffer, async (err) => {
      if (err) {
        console.log("Erro ao gravar arquivo", err);
      } else {
        //cadastra o arquivo no banco
        await user.createFile({
          nome: file.originalname,
          mime_type: file.mimetype,
          tamanho: file.size,
          caminho,
          diretorio_pai,
        });
        console.log("Arquivo adicionado com sucesso");
      }
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
  } catch (err) {
    console.log("Erro ao renomear arquivo", err);
    res.status(500).json("Erro ao renomear arquivo");
  }
};
