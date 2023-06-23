const Directory = require("../models/Directory");
const fs = require("fs");
const createFolder = require("../utils/createFolder");
const { basePath } = require("../utils/basePath");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  try {
    const { userID, nome, caminho, diretorio_pai } = req.body;
    console.log(caminho);
    const newDirectory = await Directory.create({
      nome,
      caminho,
      proprietario: userID,
      diretorio_pai,
    });

    createFolder(`${userID.toString()}/${caminho}`);

    res.status(200).json(newDirectory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao criar pasta" });
  }
};

exports.rename = async (req, res) => {
  try {
    const { userID, folderID, caminho, novoCaminho, novoNome } = req.body;
    const diretorioAntigo = `${basePath}/${userID}${caminho}`;
    const novoDiretorio = `${basePath}/${userID}${novoCaminho}`;

    const directory = await Directory.findByPk(folderID);

    // Renomeia o diretório no banco
    const renamedDirectory = await directory.update({
      nome: novoNome,
      caminho: novoCaminho,
    });

    //Renomeia no repositorio
    if (renamedDirectory) {
      fs.renameSync(diretorioAntigo, novoDiretorio);
    }

    res.status(200).json(renamedDirectory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao renomear diretório" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { id } = req.params;
    const directories = await Directory.findAll({
      where: {
        proprietario: id,
        nome: {
          [Op.ne]: id,
        },
      },
      include: "subdirectories",
    });

    console.log(directories);
    res.status(200).json(directories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao buscar diretorios" });
  }
};
