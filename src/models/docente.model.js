const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Materia = require('../models/materia.model');

const DocenteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'No se ha proporcionado el nombre'],
        uppercase: true
    },
    segundo_nombre: {
        type: String,
        default: '',
        uppercase: true
    },
    apellido_paterno: {
        type: String,
        required: [true, 'No se ha proporcionado el apellido paterno'],
        uppercase: true
    },
    apellido_materno: {
        type: String,
        required: [true, 'No se ha proporcionado el apellido materno'],
        uppercase: true
    },
    email: {
        type: String,
        unique: [true, 'Este email ya ha sido registrado'],
        required: [true, 'El  campo email es requerido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Se ha introducido un email no valido']
    },
    materias_asignadas: {
        type: Number,
        default: 0
    },
    horas_planta: {
        type: Number,
        required: [true, 'No se han proporcionado las horas de planta']
    },
    horas_cubiertas: {
        type: Number,
        default: 0,
        max: [this.horas_planta, 'Las horas cubiertas no pueden ser superiores a las horas de planta']
    },
    evaluacion_pares: {
        type: Boolean,
        default: false
    },
    id_jefe_carrera: {
        type: String,
        required: [true, 'Se debe proporcionar un jefe de carrera encargado']
    }
});


module.exports = mongoose.model('Docente', DocenteSchema);
