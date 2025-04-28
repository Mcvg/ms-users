const fs = require('fs');
const yaml = require('js-yaml');
require('dotenv').config(); // Manejo de credenciales
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const helmet = require('helmet'); // Proteger la app de ataques
const cors = require('cors'); // Permitir el acceso a la API desde otros dominios
const morgan = require('morgan'); // Middleware para registrar las peticiones HTTP
const swaggerUi = require('swagger-ui-express'); // Documentar API
const errorHandler = require('./middlewares/errorMiddleware');
const restrictAccess = require('./middlewares/restrictAccess');
const { sequelize } = require('./models');

// Load the Swagger YAML file
const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(restrictAccess);
app.use('/v1/operaciones/entretenimiento/gestion/videojuegos', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

module.exports = app;