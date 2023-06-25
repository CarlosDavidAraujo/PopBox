const Directory = require("../models/Directory");
const User = require("../models/User");
const fs = require("fs");
const { basePath } = require("../utils/basePath");

exports.create = async (req, res) => {
  try {
    const { userID, nome, caminho, diretorio_pai } = req.body;

    const user = await User.findByPk(userID);

    fs.mkdirSync(`${basePath}${caminho}`);

    const newDirectory = await user.createDirectory({
      nome,
      caminho,
      diretorio_pai,
    });

    res.status(200).json(newDirectory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao criar pasta" });
  }
};

exports.rename = async (req, res) => {
  try {
    const { folderID, caminho, novoCaminho, novoNome } = req.body;
    const diretorioAntigo = basePath + caminho;
    const novoDiretorio = basePath + novoCaminho;

    const directory = await Directory.findByPk(folderID);

    //Renomeia primeiramente repositorio, assim se der erro ele nao executará nads no banco
    fs.renameSync(diretorioAntigo, novoDiretorio);

    // Renomeia o diretório no banco
    const renamedDirectory = await directory.update({
      nome: novoNome,
      caminho: novoCaminho,
    });

    res.status(200).json(renamedDirectory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao renomear diretório" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id, caminho } = req.query;

    fs.rmdirSync(`${basePath}${caminho}`);
    await Directory.destroy({
      where: {
        id,
      },
    });
    res.status(200).json("pasta removida");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("Houve um erro ao excluir a pasta. Verifique se ela está vazia!");
  }
};

exports.findAll = async (req, res) => {
  try {
    const { id } = req.params;
    const directories = await Directory.findAll({
      where: {
        proprietario: id,
      },
    });

    res.status(200).json(directories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao buscar diretorios" });
  }
};
