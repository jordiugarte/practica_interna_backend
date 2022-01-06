const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'No se ha proporcionado el nombre'],
        uppercase: true
    },
    id_docente: {
        type: String,
        default: ''
    },
    id_jefe_carrera: {
        type: String,
        required: [true, 'No se ha proporcionado el jefe de carrera encargado']
    },
    inicio: {
        type: Date,
        required: [true, 'No se ha proporcionado la fecha de inicio']
    },
    fin: {
        type: Date,
        required: [true, 'No se ha proporcionado la fecha final']
    },
    aula: {
        type: String,
        default: ''
    },
    silabo_subido: {
        type: Boolean,
        default: false
    },
    aula_revisada: {
        type: Boolean,
        default: false
    },
    examen_revisado: {
        type: Boolean,
        default: false
    },
    contrato_impreso: {
        type: Boolean,
        default: false
    },
    contrato_firmado: {
        type: Boolean,
        default: false
    },
    planilla_lista: {
        type: Boolean,
        default: false
    },
    planilla_firmada: {
        type: Boolean,
        default: false
    },
    cheque_solicitado: {
        type: Boolean,
        default: false
    },
    cheque_recibido: {
        type: Boolean,
        default: false
    },
    cheque_entregado: {
        type: Boolean,
        default: false
    },
    horas_totales: {
        type: Number,
        required: [true, 'No se ha proporcionado las horas'],
    },
    horas_planta: {
        type: Number,
        default: 0,
        max: [this.horas_totales, 'Las horas de planta no pueden ser superiores a las horas totales']
    },
    excel: {
        type: Boolean,
        default: false
    },
    codigo: {
        type: String,
        default: ''
    }
});


module.exports = mongoose.model('Materia', MateriaSchema);

