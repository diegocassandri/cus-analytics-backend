const routes = require("express").Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var path = require('path');

// Swagger set up
const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Documentação Cus-Analytics",
        version: "1.0.0",
        description:
          "Documentação Cus-Analytics",
        contact: {
          name: "Diego Cassandri",
          url: "senior.com.br",
          email: "diego.cassandri@senior.com.br"
        }
      },
      servers: [
        {
          url: "http://localhost:3333"
        }
      ]
    },
    apis: [ __filename,path.resolve(__dirname, '../') + '/models/*',path.resolve(__dirname, '../') + '/router/*']
  };
  const specs = swaggerJsdoc(options);
  routes.use("/docs", swaggerUi.serve);
  routes.get("/docs", swaggerUi.setup(specs, { explorer: true }));

module.exports = { routes };