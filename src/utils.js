const correos = require('./correos');
const nodemailer = require('nodemailer');

function default_response(req, res) {
    return response(req, res, (req, res, result) => {
        return res.status(200).send(result);
    });
}

function response(req, res, func) {
    return (err, result) => {
        if(err){
            if(err.name === 'MongoError' && err.code === 11000){
                return res.status(500).send({
                    message: "El campo [" + Object.keys(err.keyValue)[0] + "] ya ha sido registrado en la base de datos"
                })
            }else if(err.name === 'ValidationError'){
                return res.status(500).send({
                    message: err.errors[Object.keys(err.errors)[0]].properties.message
                })
            }
            else{
                return res.status(500).send({
                    message: err
                })
            }
        }
        if(!result) return res.status(404).send({
            message: 'No se ha encontrado los datos en la base de datos'
        });

        return func(req, res, result);
    }
}

function getSemestre(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    if(month === 1) year--;
    let start = (month >= 2 && month <= 7)? year+'-02-1' : year+'-08-01';
    let end = (month >= 2 && month <= 7)? year+'-07-31' : (year+1)+'-01-31';
    return {start: new Date(start), end: new Date(end)}
}

async function sendMail(destino, materia, inicio, fin, correo_id, callback){
    console.log(correo_id);
    console.log(correo_id in correos);
    let correo = correos[correo_id];
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "segdocentes@gmail.com",
            pass: "samujoaco123"
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: '"Doc-Tracker"',
        to: destino,
        subject: correo.asunto,
        html: `<p>Estimado docente,</p>
                <p>${correo.mensaje(materia, inicio, fin)}</p>
                <p>Saludos atentos, </p>
                <p>DocTracker - Sistema de Gestión de Procedimientos Docentes de la UPB\`</p>
                <small>Por favor, NO responda a este mensaje, es un envío automático.</small>`
    };
    let info = await transporter.sendMail(mailOptions);
    callback(info);
}

module.exports = {
    default_response,
    response,
    getSemestre,
    sendMail
};
