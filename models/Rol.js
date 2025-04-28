const { Model, DataTypes } = require('sequelize');

class Rol extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Rol',
        tableName: 'roles',
        timestamps: false,
      }
    );
  }
}

module.exports = Rol;