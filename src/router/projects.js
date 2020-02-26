const express = require("express");
const routes = express.Router();
const ProjectController = require('../controllers/ProjectController');
const PopulateController = require('../controllers/PopulateController');

const auth = require('../middleware/auth');
const multer = require('multer');

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

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

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


module.exports = {
    routes
};