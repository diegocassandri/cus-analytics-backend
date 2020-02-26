const routes = require("express").Router();
const ResourceController = require('../controllers/ResourceController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Resource management
 */

  /**
 * @swagger
 * path:
 *  /resources:
 *    get:
 *      summary: Lista todos os recursos
 *      tags: [Resources]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Resource'
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "201":
 *          description: A resource schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *        "401":
 *          description: Não autorizado  
 */
routes.get('/resources',auth,ResourceController.findAll);

/**
 * @swagger
 * path:
 *  /resources/{id}:
 *    get:
 *      summary: Retorna um recurso
 *      tags: [Resources]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Resource'
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        "201":
 *          description: A area schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *        "401":
 *          description: Não autorizado  
 */
routes.get('/resources/:id',auth,ResourceController.findById);

/**
 * @swagger
 * path:
 *  /resources:
 *    post:
 *      summary: Cria um novo recurso
 *      tags: [Resources]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Resource'
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "201":
 *          description: A area schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *        "401":
 *          description: Não autorizado  
 */
routes.post('/resources',auth,ResourceController.create);

/**
 * @swagger
 * path:
 *  /resources/{id}:
 *    put:
 *      summary: Atualiza um recurso
 *      tags: [Resources]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Resource'
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        "201":
 *          description: A area schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *        "401":
 *          description: Não autorizado  
 */
routes.put('/resources/:id',auth,ResourceController.update);

/**
 * @swagger
 * path:
 *  /resources/{id}:
 *    delete:
 *      summary: Deleta um recurso
 *      tags: [Resources]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Resource'
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        "201":
 *          description: A area schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *        "401":
 *          description: Não autorizado  
 */
routes.delete('/resources/:id',auth,ResourceController.destroy);

module.exports = { 
    routes
};
