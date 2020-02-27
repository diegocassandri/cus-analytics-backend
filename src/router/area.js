const routes = require("express").Router();
const AreaController = require('../controllers/AreaController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: Area management
 */

 /**
 * @swagger
 * path:
 *  /areas:
 *    get:
 *      summary: Lista todas as áreas
 *      tags: [Areas]
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "200":
 *          description: A area schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Area'
 *        "401":
 *          description: Não autorizado  
 */
routes.get('/areas',auth,AreaController.findAll);

/**
 * @swagger
 * path:
 *  /areas/{id}:
 *    get:
 *      summary: Retorna uma área
 *      tags: [Areas]
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
 *        "200":
 *          description: A area schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Area'
 *        "401":
 *          description: Não autorizado  
 */
routes.get('/areas/:id',auth,AreaController.findById);

/**
 * @swagger
 * path:
 *  /areas:
 *    post:
 *      summary: Cria uma nova área
 *      tags: [Areas]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Area'
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
 *                $ref: '#/components/schemas/Area'
 *        "401":
 *          description: Não autorizado  
 */
routes.post('/areas',auth,AreaController.create);

/**
 * @swagger
 * path:
 *  /areas/{id}:
 *    put:
 *      summary: Atualiza uma área
 *      tags: [Areas]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Area'
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
 *                $ref: '#/components/schemas/Area'
 *        "401":
 *          description: Não autorizado  
 */
routes.put('/areas/:id',auth,AreaController.update);

/**
 * @swagger
 * path:
 *  /areas/{id}:
 *    delete:
 *      summary: Deleta uma área
 *      tags: [Areas]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Area'
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
 *                $ref: '#/components/schemas/Area'
 *        "401":
 *          description: Não autorizado  
 */
routes.delete('/areas/:id',auth,AreaController.destroy);

module.exports = {
    routes
}