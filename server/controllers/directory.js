const Directory = require("../models/Directory");
const fs = require("fs");
const createFolder = require("../utils/createFolder");
const { basePath } = require("../utils/basePath");
const { Op, where } = require("sequelize");

exports.create = async (req, res) => {
  try {
    const { id, nome, caminho } = req.body;

    const newDirectory = await Directory.create({
      nome,
      caminho,
      proprietario: id,
    });

    createFolder(`${id.toString()}/${caminho}`);

    res.status(200).json(newDirectory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao criar pasta" });
  }
};

exports.rename = async (req, res) => {
  try {
    const { id, caminho, novoCaminho, novoNome } = req.body;
    const diretorioAntigo = `${basePath}/${id}/${caminho}`;
    const novoDiretorio = `${basePath}/${id}/${novoCaminho}`;

    const directory = await Directory.findByPk(id);

    // Renomeia o diretório no banco

    const renamedDirectory = await directory.update(
      {
        nome: novoNome,
        caminho: novoCaminho,
      },
      {
        where: {
          proprietario: id,
          caminho: caminho,
        },
      }
    );

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
    });

    res.status(200).json(directories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao buscar diretorios" });
  }
};
