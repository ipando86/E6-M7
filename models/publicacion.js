const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('publicacion', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
};