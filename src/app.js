const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const materia_routes = require('./routes/materia.routes');
const docente_routes = require('./routes/docente.routes');
const usuario_routes = require('./routes/usuario.routes');
const extra_routes = require('./routes/extra.routes');
const reset_routes = require('./routes/reset.routes');

app.use(bodyParser.urlencoded({limit: '10mb', extended:false}));
app.use(bodyParser.json({limit: '10mb'}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/materias', materia_routes);
app.use('/docentes', docente_routes);
app.use('/usuarios', usuario_routes);
app.use('', extra_routes);
app.use('/reset', reset_routes);

module.exports = app;
