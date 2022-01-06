const mongoose = require('mongoose');
const app = require('./app');
const port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/docfollow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
