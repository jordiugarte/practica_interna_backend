const mongoose = require('mongoose');
const app = require('./app');
const port = 7900;

const fs = require('fs');
const https = require('https');
const req = require('express/lib/request');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://jugarte18:j0rd12022@localhost:27017/jugarte18', {
    mongoose.connect('mongodb://localhost:27017/jugarte18', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Conexion a la base de datos establecida con exito");
        https.createServer({
            cert: fs.readFileSync('selfsigned.crt'),
            key: fs.readFileSync('selfsigned.key')
        }, app).listen(port, () => {
            console.log('SSL/TLS Server using self generated certificate');
            console.log(`Servidor corriendo correctamente en la url: localhost:${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
