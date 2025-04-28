const Usuario = require('../models/User');
const Rol = require('../models/Rol');
const UsuarioRol = require('../models/UserRol');

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const usuario = await Usuario.create({ nombre, correo, contraseña });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignRoleToUsuario = async (req, res) => {
  try {
    const { usuario_id, rol_id } = req.body;
    const usuarioRol = await UsuarioRol.create({
      usuario_id,
      rol_id,
      fecha_creacion: new Date(),
      fecha_ultima_actualizacion: new Date(),
    });
    res.status(201).json(usuarioRol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsuarioRoles = async (req, res) => {
  try {
    const { usuario_id } = req.query;

    const usuario = await Usuario.findByPk(usuario_id, {
      include: {
        model: Rol,
        attributes: ['nombre'],
        through: { attributes: [] },
      },
      attributes: ['id', 'nombre', 'correo', 'fecha_registro'],
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const fechaRegistro = new Date(usuario.fecha_registro).toISOString().split('T')[0];

    const roles = usuario.Rols.map((rol) => ({
      nombre: rol.nombre,
    }));

    const response = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      fecha_registro: fechaRegistro,
      roles,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};