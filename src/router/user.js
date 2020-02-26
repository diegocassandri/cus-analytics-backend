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
 *      responses:
 *        "201":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
routes.post('/users',UserController.create);

/**
 * @swagger
 * path:
 *  /users/me:
 *    post:
 *      summary: Retorna informações no usuário logado
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
routes.get('/users/me',auth,UserController.me);

/**
 * @swagger
 * put:
 *  /users/me:
 *    post:
 *      summary: Atualiza informações do usuário logado
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
routes.put('/users/me',auth,UserController.update);

//Autenticação

/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: Auth management
 */

routes.post('/login',UserController.login);
routes.post('/logout',auth,UserController.logout);
routes.post('/logoutall',auth,UserController.logoutall);



module.exports = { routes }