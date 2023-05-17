const Directory = require("../models/Directory");
const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const user = await User.create({
      nome,
      email,
      senha,
      cota: 100.0,
      administrador: true,
    });

    //createDirectory é um método especial criado pelo sequelize após definir a associação entre os modelos
    //para entender melhor é só acessar esse link https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
    user.createDirectory({
      nome: "root",
    });

    res.send("Usuário cadastrado com sucesso");
  } catch (err) {
    console.log(err);
    res.send("Erro ao cadastrar usuário");
  }
};


//demais controladores aqui
//exemplo:
//exports.login = async (req, res) => {}
