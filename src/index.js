const express = require('express');
const routes = require('./router/routes.js');
var cors = require('cors');

require('./db/mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000);

