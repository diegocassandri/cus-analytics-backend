const express = require("express");
const routes = express.Router();

const userRoutes = require('./user');
const areaRoutes = require('./area');
const resourceRoutes = require('./resources');
const projectsRoutes = require('./projects');
const docsRoutes = require('./docs');

//Rotas externas
routes.use(userRoutes.routes);
routes.use(areaRoutes.routes);
routes.use(resourceRoutes.routes);
routes.use(projectsRoutes.routes);
routes.use(docsRoutes.routes);


module.exports = routes;  