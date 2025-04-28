const request = require('supertest');
const app = require('../server');

describe('Pruebas de integración del servidor', () => {
  it('Debería responder con la documentación de Swagger en /api-docs', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });

  it('Debería devolver 404 para rutas no definidas', async () => {
    const response = await request(app).get('/ruta-inexistente');
    expect(response.statusCode).toBe(404);
  });
});