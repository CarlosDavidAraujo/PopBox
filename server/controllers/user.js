const Directory = require("../models/Directory");
const User = require("../models/User");
const { use } = require("../routes/user");

exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.json({
        error: "Já existe um usuário com o email cadastrado!",
      });
    }

    const user = await User.create({
      nome: nome,
      email: email,
      senha: senha,
      cota: 100.0,
      administrador: true,
    });

    const rootFolder = await user.createDirectory({
      nome: "root",
    });

    if (!rootFolder) {
      return res.json({
        error: "Erro ao cadastrar usuário, tente mais tarde!",
      });
    }

    res.json({ authenticated: true });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
        senha: senha,
      },
    });

    if (!user) {
      return res.json({ error: "Login ou senha inválidos!" });
    }
    return res.send({ authenticated: true });
  } catch (err) {
    console.log(err);
  }
};
