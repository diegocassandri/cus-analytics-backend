const routes = require("express").Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

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
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "201":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "401":
 *          description: Não autorizado  
 */
routes.post('/users',UserController.create);

/**
 * @swagger
 * path:
 *  /users/me:
 *    post:
 *      summary: Retorna informações no usuário logado
 *      tags: [Users]
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "200":
 *          description: user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "401":
 *          description: Não autorizado 
 */         
routes.get('/users/me',auth,UserController.me);

/**
 * @swagger
 * path:
 *  /users/me/:
 *    post:
 *      summary: Atualiza usuário logado
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "201":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "401":
 *          description: Não autorizado  
 */
routes.put('/users/me',auth,UserController.update);

//Autenticação

/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: Auth management
 */

/**
 * @swagger
 * path:
 *  /login/:
 *    post:
 *      summary: Realiza a autenticação do usuário
 *      tags: [Authorization]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string 
 *      responses:
 *        "201":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "401":
 *          description: Não autorizado  
 */
routes.post('/login',UserController.login);
routes.post('/logout',auth,UserController.logout);
routes.post('/logoutall',auth,UserController.logoutall);



module.exports = { routes }