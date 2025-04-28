const { Model, DataTypes } = require('sequelize');

class UsuarioRol extends Model {
  static init(sequelize) {
    super.init(
      {
        usuario_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        rol_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'UsuarioRol',
        tableName: 'usuario_roles',
        timestamps: false,
      }
    );
  }
}

module.exports = UsuarioRol;