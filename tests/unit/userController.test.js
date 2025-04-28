const { createUsuario, assignRoleToUsuario, getUsuarioRoles } = require('../../controllers/userController');
const Usuario = require('../../models/User');
const UsuarioRol = require('../../models/UserRol');
const Rol = require('../../models/Rol');

jest.mock('../../models/User');
jest.mock('../../models/UserRol');
jest.mock('../../models/Rol');

describe('Pruebas unitarias para userController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debería crear un usuario exitosamente', async () => {
    const req = { body: { nombre: 'Juan', correo: 'juan@example.com', contraseña: '123456' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Usuario.create.mockResolvedValue(req.body);

    await createUsuario(req, res);

    expect(Usuario.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('Debería asignar un rol a un usuario', async () => {
    const req = { body: { usuario_id: 1, rol_id: 2 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    UsuarioRol.create.mockResolvedValue(req.body);

    await assignRoleToUsuario(req, res);

    expect(UsuarioRol.create).toHaveBeenCalledWith({
      usuario_id: 1,
      rol_id: 2,
      fecha_creacion: expect.any(Date),
      fecha_ultima_actualizacion: expect.any(Date),
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('Debería devolver los roles de un usuario', async () => {
    const req = { query: { usuario_id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Usuario.findByPk.mockResolvedValue({
      id: 1,
      nombre: 'Juan',
      correo: 'juan@example.com',
      fecha_registro: new Date(),
      Rols: [{ nombre: 'Admin' }],
    });

    await getUsuarioRoles(req, res);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ roles: [{ nombre: 'Admin' }] }));
  });
});