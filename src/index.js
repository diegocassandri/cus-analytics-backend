const express = require('express');
const routes = require('./router/routes.js');
var cors = require('cors');

require('./db/mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});


app.listen(process.env.PORT || 3000);

