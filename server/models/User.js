const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Directory = require("./Directory");
const File = require("./File");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cota: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  administrador: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

User.hasMany(Directory, { foreignKey: "proprietario" });
Directory.belongsTo(User, { foreignKey: "proprietario" });

User.hasMany(File, { foreignKey: "proprietario" });
File.belongsTo(User, { foreignKey: "proprietario" });

Directory.hasMany(File, { foreignKey: "diretorio_pai", as: "files" });
File.belongsTo(Directory, {
  foreignKey: "diretorio_pai",
  as: "parentDirectory",
});

Directory.hasMany(Directory, {
  as: "subdirectories",
  foreignKey: "diretorio_pai",
});
Directory.belongsTo(Directory, {
  as: "parentDirectory",
  foreignKey: "diretorio_pai",
});

module.exports = User;
