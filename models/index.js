const { Sequelize } = require('sequelize');
const Usuario = require('./User');
const Rol = require('./Rol');
const UsuarioRol = require('./UserRol');

require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log,
});

Usuario.init(sequelize);
Rol.init(sequelize);
UsuarioRol.init(sequelize);

Usuario.belongsToMany(Rol, { through: UsuarioRol, foreignKey: 'usuario_id' });
Rol.belongsToMany(Usuario, { through: UsuarioRol, foreignKey: 'rol_id' });

module.exports = {
  sequelize,
  Usuario,
  Rol,
  UsuarioRol,
};