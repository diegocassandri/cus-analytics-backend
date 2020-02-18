const { Router } = require('express');
const ProjectController = require('./controllers/ProjectController');
const PopulateController = require('./controllers/PopulateController');
const UserController = require('./controllers/UserController');

const auth = require('./middleware/auth');

const multer = require('multer');


const dirFiles = process.env.DIR_FILES;

const routes = Router();

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

//Usuário
routes.post('/users',auth,UserController.create);
routes.get('/users/me',auth,UserController.me);
routes.put('/users/me',auth,UserController.update);

//Autenticação
routes.post('/login',UserController.login);
routes.post('/logout',auth,UserController.logout);
routes.post('/logoutall',auth,UserController.logoutall);

module.exports = routes;  