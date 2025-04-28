jest.mock('../../models/User', () => {
  return {
    create: jest.fn().mockResolvedValue({
      id: 1,
      nombre: 'Pedro Martinez',
      correo: 'pedrom@example.com',
      contraseña: '654321',
      fecha_registro: new Date(),
    }),
    findOne: jest.fn().mockResolvedValue({
      id: 2,
      nombre: 'Pedro Martinez',
      correo: 'pedrom@example.com',
      contraseña: '654321',
      fecha_registro: new Date(),
    }),
  };
});

const Usuario = require('../../models/User');

describe('Pruebas unitarias con mocks de base de datos', () => {
  it('Debería crear un usuario correctamente', async () => {
    const user = await Usuario.create({
      nombre: 'Pedro Martinez',
      correo: 'pedrom@example.com',
      contraseña: '654321',
    });

    expect(Usuario.create).toHaveBeenCalledWith({
      nombre: 'Pedro Martinez',
      correo: 'pedrom@example.com',
      contraseña: '654321',
    });
    expect(user.nombre).toBe('Pedro Martinez');
    expect(user.correo).toBe('pedrom@example.com');
  });

  it('Debería encontrar un usuario por correo', async () => {
    const user = await Usuario.findOne({ where: { correo: 'pedrom@example.com' } });

    expect(Usuario.findOne).toHaveBeenCalledWith({ where: { correo: 'pedrom@example.com' } });
    expect(user).not.toBeNull();
    expect(user.correo).toBe('pedrom@example.com');
  });
});