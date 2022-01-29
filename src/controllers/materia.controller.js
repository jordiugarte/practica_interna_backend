const MateriaController = require('../models/materia.model');
const Docente = require('../models/docente.model');
const utils = require('../utils');
const default_response = utils.default_response;
const response = utils.response;

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var db;

function actualizarHoras(req, res, docenteId, materia, sumar, callback){
    if(!docenteId) return callback();
    Docente.findById(docenteId, response(req, res, (req, res, docente) => {
        let coef = sumar? 1 : -1;
        let nuevas_horas = docente.horas_cubiertas + (coef * materia.horas_planta);
        if(nuevas_horas > docente.horas_planta){
            return res.status(500).send({message: 'Las horas cubiertas no pueden sobrepasar las horas totales de planta'})
        }
        Docente.findByIdAndUpdate(docenteId,{
            materias_asignadas: docente.materias_asignadas + coef,
            horas_cubiertas: docente.horas_cubiertas + (coef * materia.horas_planta)
        },  {new: true}, response(req, res, (req, res, d) => {
            callback();
        }));
    }));
}

const controller = {

    createMateria: function (req, res) {
        let materia = new MateriaController(Object.assign(req.body));
        actualizarHoras(req, res, materia.id_docente, materia, true, () => {
            materia.save(default_response(req, res));
        });
    },

    createMateriasExcel: async function (req, res) {
        let materia = new MateriaController(Object.assign(req.body));
        actualizarHoras(req, res, materia.id_docente, materia, true, () => {
            materia.save(default_response(req, res));
        });
    },

    getMateria: function(req, res){
        let materiaID = req.params.id;
        MateriaController.findById(materiaID, default_response(req, res));
    },

    getMaterias : function (req, res) {
        MateriaController.find({}).exec(default_response(req, res));
    },

    updateMateria: function(req, res){
        let materiaId = req.params.id;
        let update = req.body;

        MateriaController.findById(materiaId, response(req, res, (req, res, materia)=> {
            actualizarHoras(req, res, update.id_docente, update, true, () => {
                actualizarHoras(req, res, req.params.docente_antiguo_id, materia, false, () => {
                    MateriaController.findByIdAndUpdate(materiaId, update, {new: true}, default_response(req, res));
                });
            });
        }));

    },

    deleteMateria: function(req, res){
        let materiaId = req.params.id;
        MateriaController.findById(materiaId, response(req, res, (req, res, materia)=> {
            actualizarHoras(req, res, req.params.docente_antiguo_id, materia, false, () => {
                MateriaController.findByIdAndDelete(materiaId, default_response(req, res));
            });
        }));
    },

    getMateriasJefeCarrera: function (req, res){
        let jefeCarreraId = req.params.id_jefe_carrera;
        MateriaController.find({id_jefe_carrera: jefeCarreraId}).exec(default_response(req, res));
    },

    getMateriasSemestre: function(req, res){
        let anio = req.params.anio;
        let semestre = req.params.semestre;
        let s = new Date(anio + (semestre === '1'? '-01-01' : '-08-01'));
        let e = new Date((semestre === '1'? anio + '-07-31' : anio + '-12-31'));

        MateriaController.find({
            $and: [
                { inicio: { $gte: s} },
                { fin: {$lte: e}}
            ]
        }).exec(default_response(req, res));
    },

    getMateriasSemestreJefeCarrera: function(req, res){
        let jefeCarreraId = req.params.id_jefe_carrera;
        let anio = req.params.anio;
        let semestre = req.params.semestre;
        let s = new Date(anio + (semestre === '1'? '-01-01' : '-08-01'));
        let e = new Date((semestre === '1'? anio + '-07-31' : anio + '-12-31'));
        MateriaController.find({
            $and: [
                { inicio: { $gte: s} },
                { fin: {$lte: e}},
                { id_jefe_carrera: jefeCarreraId }
            ]
        }).exec(default_response(req, res));
    }
};

module.exports = controller;
