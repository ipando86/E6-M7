const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
};