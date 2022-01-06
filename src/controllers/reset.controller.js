const Reset = require('../models/reset.model');
const Docente = require('../models/reset.model');
const utils = require('../utils');
const response = utils.response;
const default_response = utils.default_response;

const controller = {
    resetEvalPares: function(req, res) {
        Docente.update({evaluacion_pares: true}, {$set:{evaluacion_pares: false}}, {"multi": true}, response(req, res, (req, res, docentes) => {
            Reset.findOne({value: 'ModuloDocentes'}).exec(response(req, res, (req, res, reset) => {
                Reset.findIdUpdate(reset._id, {evaluacion_pares: new Date()}, default_response(req, res));
            }));
        }));
    },

    resetSemestre: function(req, res) {
        Docente.update({}, {$set:{horas_planta: 0, materias_asignadas: 0}}, {"multi": true}, response(req, res, (req, res, docentes) => {
            Reset.findOne({value: 'ModuloDocentes'}).exec(response(req, res, (req, res, reset) => {
                Reset.findIdUpdate(reset._id, {semestre: new Date()}, default_response(req, res));
            }));
        }));
    },

    lastReset: function(req, res){
        Reset.findOne({value: 'ModuloDocentes'}).exec(default_response(req, res));
    }
};

module.exports = controller;
