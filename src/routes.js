const { Router } = require('express');
const ProjectController = require('./controllers/ProjectController');
const PopulateController = require('./controllers/PopulateController');
const multer = require('multer');

const routes = Router();

const dirFiles = process.env.DIR_FILES;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dirFiles)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

routes.get('/projects',ProjectController.findAll);
routes.post('/projects',ProjectController.create);
routes.get('/projects/:id',ProjectController.findById);
routes.put('/projects/:id',ProjectController.update);
routes.delete('/projects/:id',ProjectController.destroy);

routes.get('/populate',PopulateController.index);
//routes.post('/populate/upload', PopulateController.uploadProject);

routes.post('/populate/upload',upload.single('file'), (req, res) => res.json({
    message: 'Upload realizado com sucesso'
})); 

module.exports = routes;  