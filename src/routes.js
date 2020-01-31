const { Router } = require('express');
const ProjectController = require('./controllers/ProjectController');

const routes = Router();

routes.get('/projects',ProjectController.index);
routes.get('/projects/:id',ProjectController.indexOne);

module.exports = routes;  