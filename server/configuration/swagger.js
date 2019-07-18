import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Way-Farer',
    version: '1.0.0',
    description: 'Way-Farer is a public bus transportation booking server.',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Token',
      in: 'header',
    },
  },
  host: 'way-farerapp.herokuapp.com',
  basePath: '/api/v1',
};

const options = {
  swaggerDefinition,
  apis: ['*/swagger/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
