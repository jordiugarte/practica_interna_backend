const mongoose = require('mongoose');
const app = require('./app');

const port = 7900;

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://jugarte18:j0rd12022@localhost:27017/jugarte18', {
mongoose.connect('mongodb://localhost:27017/jugarte18', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /*ssl: true,
    sslValidate: true,
    sslCA: `${__dirname}/rootCA.pem`*/
    })
    .then(() => {
        console.log("Conexion a la base de datos establecida con exito");
        app.listen(port, () => {
            console.log(`Servidor corriendo correctamente en la url: localhost:${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    });
