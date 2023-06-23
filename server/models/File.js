const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const File = sequelize.define("File", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mime_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tamanho: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  caminho: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = File;
