const request = require('supertest');
const app = require('../../app');

describe('Pruebas de rutas para userRoutes', () => {
  it('Debería manejar POST /usuarios', async () => {
    const response = await request(app)
      .post('/v1/operaciones/entretenimiento/gestion/videojuegos/usuarios')
      .send({
        nombre: 'Juan',
        correo: 'juan@example.com',
        contraseña: '123456',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('nombre', 'Juan');
  });

  it('Debería manejar POST /usuarios/roles', async () => {
    const response = await request(app)
      .post('/v1/operaciones/entretenimiento/gestion/videojuegos/usuarios/roles')
      .send({
        usuario_id: 1,
        rol_id: 2,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('usuario_id', 1);
  });
});