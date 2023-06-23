const fs = require("fs");
const { basePath } = require("../utils/basePath");
const File = require("../models/File");

module.exports.create = async (req, res) => {
  try {
    let newFile;
    const { userID, diretorio_pai, caminho } = req.body;
    const file = req.file;

    // Cria o arquivo no repositorio
    const path = basePath + "/" + userID + caminho;

    fs.writeFile(path, file.buffer, async (err) => {
      if (err) {
        console.log("Erro ao gravar arquivo", err);
      } else {
        //cadastra o arquivo no banco
        newFile = await File.create({
          nome: file.originalname,
          mime_type: file.mimetype,
          tamanho: file.size,
          caminho,
          proprietario: userID,
          diretorio_pai,
        });
        console.log("Arquivo adicionado com sucesso");
      }
    });

    res.status(200).json(newFile);
  } catch (err) {
    console.log("Erro ao adicionar arquivo", err);
    res.status(500).json("Erro ao adicionar arquivo");
  }
};

exports.findAll = async (req, res) => {
  try {
    const { id } = req.params;
    const files = await File.findAll({
      where: {
        proprietario: id,
      },
    });

    res.status(200).json(files);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao buscar arquivos" });
  }
};
