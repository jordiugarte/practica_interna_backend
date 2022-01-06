const DocenteController = require('../models/docente.model');
const Materia = require('../models/materia.model');
const utils = require('../utils');
const default_response = utils.default_response;
const response = utils.response;

const controller = {

    createDocente: function (req, res) {
        let docente = new DocenteController(Object.assign(req.body));
        docente.save(default_response(req, res));
    },

    getDocente: function(req, res){
        let docenteID = req.params.id;
        DocenteController.findById(docenteID, default_response(req, res));
    },

    getDocentes: async function (req, res) {
        let semester = utils.getSemestre();
        Materia.find({
            $and: [
                { inicio: { $gte: semester.start} },
                { fin: {$lte: semester.end}}
            ]
        }).exec(response(req, res, (req, res, materias) => {
            DocenteController.find().exec(response(res, res, (req, res, docentes) => {
                let materias_asignadas = {};
                let horas_cubiertas = {};
                materias.forEach(materia => {
                    let doc = materia.id_docente;
                    if(doc){
                        if(!(doc in materias_asignadas)){
                            materias_asignadas[doc] = 0;
                            horas_cubiertas[doc] = 0;
                        }
                        materias_asignadas[doc]++;
                        horas_cubiertas[doc] += materia.horas_planta
                    }
                });
                let newDocs = docentes.map(docente => {
                    let id = docente._id;
                    if(id in materias_asignadas){
                        docente.materias_asignadas = materias_asignadas[id];
                        docente.horas_cubiertas = horas_cubiertas[id];
                    }
                    return docente;
                });
                return res.status(200).send(newDocs);
            }))
        }));

    },

    updateDocente: function(req, res){
        let docenteId = req.params.id;
        let update = req.body;

        DocenteController.findByIdAndUpdate(docenteId, update, {new: true}, default_response(req, res));
    },

    deleteDocente: function(req, res){
        let docenteId = req.params.id;
        Materia.updateMany({id_docente: docenteId}, {"$set": {id_docente: "", horas_planta: 0}}, response(req, res,
            (req, res, materias) => {
                DocenteController.findByIdAndDelete(docenteId, default_response(req, res));
        }));
    },

    getDocentesJefeCarrera: function (req, res){
        let jefeCarreraId = req.params.id_jefe_carrera;
        DocenteController.find({id_jefe_carrera: jefeCarreraId}).exec(default_response(req, res));
    }
};

module.exports = controller;
