const express = require("express");
const routes = express.Router();
const ProjectController = require('../controllers/ProjectController');
const PopulateController = require('../controllers/PopulateController');

const auth = require('../middleware/auth');
const multer = require('multer');

const dirFiles = process.env.DIR_FILES;

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


//Projetos

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * path:
 *  /projects:
 *    get:
 *      summary: Lista todas as áreas
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "200":
 *          description: A Project schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        "401":
 *          description: Não autorizado  
 */
routes.get('/projects',auth,ProjectController.findAll);

/**
 * @swagger
 * path:
 *  /prohects:
 *    post:
 *      summary: Cria um novo projeto
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "201":
 *          description: A Project schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        "401":
 *          description: Não autorizado  
 */
routes.post('/projects',auth,ProjectController.create);

/**
 * @swagger
 * path:
 *  /projects/{id}:
 *    get:
 *      summary: Retorna um projeto
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
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
 *          description: A Project schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        "401":
 *          description: Não autorizado  
 */
routes.get('/projects/:id',auth,ProjectController.findById);

/**
 * @swagger
 * path:
 *  /projects/{id}:
 *    put:
 *      summary: Atualiza um projeto
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
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
 *          description: A Project schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        "401":
 *          description: Não autorizado  
 */
routes.put('/projects/:id',auth,ProjectController.update);

/**
 * @swagger
 * path:
 *  /projects/{id}:
 *    delete:
 *      summary: Deleta um projeto
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
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
 *          description: A Project schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        "401":
 *          description: Não autorizado  
 */
routes.delete('/projects/:id',auth,ProjectController.destroy);

//Populate

/**
 * @swagger
 * path:
 *  /populate:
 *    get:
 *      summary: Processo o diretório de projetos
 *      tags: [Projects]
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          description: Token de autenticação
 *      responses:
 *        "200":
 *          description: A Project schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        "401":
 *          description: Não autorizado  
 */
routes.get('/populate',auth,PopulateController.index);

/**
 * @swagger
 * path:
 *  /populate/upload:
 *    post:
 *      summary: Realiza um upload de um projeto
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:          
 *                 type: file
 *      responses:
 *        "200":
 *          description: Retorno do Upload
 *        "401":
 *          description: Não autorizado  
 */
routes.post('/populate/upload',upload.single('file'), (req, res) => res.json({
    message: 'Upload realizado com sucesso'
})); 


module.exports = {
    routes
};