const mongoose = require('mongoose');
const app = require('./app');
const port = 7900;

const user = "jugarte18";
const password = "j0rd12022";

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${user}:${password}@localhost:27017/jugarte18`, {
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
