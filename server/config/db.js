const { Sequelize } = require("sequelize");

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize(
  "popbox", //nome do banco de dados
  "root", //nome de usuario do banco
  "123456", //senha do banco
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// Testar a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao conectar-se ao banco de dados:", error);
  });

async function syncDatabase() {
  await sequelize.sync({ force: true });
}
//syncDatabase();

module.exports = sequelize;
