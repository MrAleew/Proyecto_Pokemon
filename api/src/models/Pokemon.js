const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {

    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type : DataTypes.TEXT,
      allowNull: true
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    atq: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    def: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createInDb: { // para hacer una distincion entre los que me trae la bd y la api, con esta propiedad marco a los de mi bd
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  
  
  },{ timestamps:false });
};








