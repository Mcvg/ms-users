const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        correo: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        contraseña: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        fecha_registro: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: false,
      }
    );
  }
}

module.exports = Usuario;