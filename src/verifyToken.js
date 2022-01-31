const Usuario = require('./models/usuario.model');
const { OAuth2Client }  = require('google-auth-library');
const response = require('./utils').response;

const client = new OAuth2Client('340969997238-mm6v3v5uv4m221rq91qjh6rr8hcur83v.apps.googleusercontent.com');
var userInfo;

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '340969997238-mm6v3v5uv4m221rq91qjh6rr8hcur83v.apps.googleusercontent.com',
    });
    userInfo = ticket.getPayload();
}

function TokenValidation(req, res, next) {
    const token = req.header('Token');
    if(!token) return res.status(401).send({ message: 'Acceso denegado'});

    verify(token)
        .then( () => {
            Usuario.findOne({email: userInfo['email']}).exec((err, user) => {
                if(err) return res.status(500).send({
                    message: 'Error de conexion a la base de datos'
                });
                if(!user) return res.status(404).send({
                    message: 'Esta cuenta no existe'
                });

                next();
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message: "Acceso denegado"})
        });

}

module.exports = TokenValidation;
