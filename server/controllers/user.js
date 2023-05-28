const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(500).json({
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
      return res.status(500).json({
        error: "Erro ao cadastrar usuário, tente mais tarde!",
      });
    }

    res.status(200).json({ user_id: user.id });
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
      return res.status(500).json({ error: "Login ou senha inválidos!" });
    }

    return res.status(200).json({ user_id: user.id });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(500)
        .json({ error: "Houve um erro ao carregar os dados do seu perfil" });
    }

    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    connsole.error(err);
  }
};
