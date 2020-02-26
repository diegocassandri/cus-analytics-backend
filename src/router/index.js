"use strict";
const express = require("express");
const routes = express.Router();
const ProjectController = require('../controllers/ProjectController');
const PopulateController = require('../controllers/PopulateController');
const UserController = require('../controllers/UserController');
const AreaController = require('../controllers/AreaController');
const ResourceController = require('../controllers/ResourceController');

const auth = require('../middleware/auth');

const multer = require('multer');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dirFiles = process.env.DIR_FILES;
var path = require('path');



//Configuração storage multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dirFiles)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */


//Projetos
routes.get('/projects',auth,ProjectController.findAll);
routes.post('/projects',auth,ProjectController.create);
routes.get('/projects/:id',auth,ProjectController.findById);
routes.put('/projects/:id',auth,ProjectController.update);
routes.delete('/projects/:id',auth,ProjectController.destroy);

//Populate
routes.get('/populate',auth,PopulateController.index);

routes.post('/populate/upload',upload.single('file'), (req, res) => res.json({
    message: 'Upload realizado com sucesso'
})); 

//Area
routes.get('/areas',auth,AreaController.findAll);
routes.get('/areas/:id',auth,AreaController.findById);
routes.post('/areas',auth,AreaController.create);
routes.put('/areas/:id',auth,AreaController.update);
routes.delete('/areas/:id',auth,AreaController.destroy);
//Resource
routes.get('/resources',auth,ResourceController.findAll);
routes.get('/resources/:id',auth,ResourceController.findById);
routes.post('/resources',auth,ResourceController.create);
routes.put('/resources/:id',auth,ResourceController.update);
routes.delete('/resources/:id',auth,ResourceController.destroy);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */


//Usuário
/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Cria um novo usuário
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
routes.post('/users',UserController.create);

routes.get('/users/me',auth,UserController.me);
routes.put('/users/me',auth,UserController.update);

//Autenticação

routes.post('/login',UserController.login);
routes.post('/logout',auth,UserController.logout);
routes.post('/logoutall',auth,UserController.logoutall);

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
    apis: [ __filename,path.resolve(__dirname, '../') + '/models/*',]
  };
  const specs = swaggerJsdoc(options);
  routes.use("/docs", swaggerUi.serve);
  routes.get("/docs", swaggerUi.setup(specs, { explorer: true }));

module.exports = routes;  