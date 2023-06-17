const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Directory = sequelize.define('Directory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caminho: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Directory;