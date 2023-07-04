const { jwtSecret } = require("../config/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Directory = require("../models/Directory");
const { basePath } = require("../utils/basePath");

//--------------------- CADASTRO DE USUARIO -------------------------//

exports.create = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    //verifica se o usuario ja existe
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(401).json({
        error: "Já existe um usuário com o email cadastrado!",
      });
    }

    //cria usuario
    const user = await User.create({
      nome: nome,
      email: email,
      senha: senha,
      cota: 100.0,
      administrador: false,
    });

    fs.mkdirSync(`${basePath}/${user.uuid}`);

    //cria a primeira pasta do usuario que sera a raiz de seu repositorio, a pasta raiz é nomeada automaticamente com o uuid do usuario
    const rootFolder = await user.createDirectory({
      nome: user.uuid,
      caminho: `/${user.uuid}`,
    });

    if (!rootFolder) {
      return res.status(500).json({
        error: "Erro ao cadastrar usuário, tente mais tarde!",
      });
    }

    //envio de dados do usuario para o front-end
    const { senha: password, ...userWithoutPassword } = user.dataValues;
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ token: token, user: userWithoutPassword });
  } catch (err) {
    console.log(err);
  }
};

//-------------------------- LOGIN DE USUARIO ---------------------------//

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
        senha: senha,
      },
      attributes: { exclude: ["senha"] },
    });

    if (!user) {
      return res.status(401).json({ error: "Login ou senha inválidos!" });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });
    console.log(user);
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
  }
};

//------------------------ATUALIZAÇÃO DE CADASTRO ------------------------//

exports.update = async (req, res) => {
  try {
    const { id, nome, email, senha, nova_senha } = req.body;

    const user = await User.findByPk(id, {
      include: [Directory],
    });

    if (user.dataValues.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }

    const updatedUser = await user.update({
      nome,
      email,
      senha: nova_senha ? nova_senha : user.dataValues.senha,
    });

    if (!updatedUser) {
      return res.status(401).json({
        error: "Houve um erro ao atualizar seus dados, tente mais tarde!",
      });
    }

    const { senha: password, ...userWithoutPassword } = user.dataValues;

    res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    console.log(err);
  }
};

//------------------------EXCLUSÃO DE CADASTRO ------------------------//

exports.delete = async (req, res) => {
  try {
    const { senha } = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user.dataValues.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }

    await user.destroy();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log("Erro ao buscar usuarios:", err);
    res.status(500).json("Erro ao buscar usuários");
  }
};
