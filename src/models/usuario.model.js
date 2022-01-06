const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreferenciaMateriaSchema = new Schema({
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
        type: Boolean,
        default: false
    },
    horas_planta: {
        type: Boolean,
        default: false
    }
});

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'No se ha proporcionado el campo nombre'],
        uppercase: true
    },
    nombre_corto: {
        type: String,
        default: '',
        uppercase: true
    },
    segundo_nombre: {
        type: String,
        default: '',
        uppercase: true
    },
    apellido_paterno: {
        type: String,
        required: [true, 'No se ha proporcionado el campo apellido paterno'],
        uppercase: true
    },
    apellido_materno: {
        type: String,
        required: [true, 'No se ha proporcionado el campo apellido materno'],
        uppercase: true
    },
    email: {
        type: String,
        unique: [true, 'Este email ya ha sido registrado'],
        required: [true, 'No se ha proporcionado el campo email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Se ha introducido un email no valido']
    },
    rol: {
        type: String,
        enum: {
            values: ['jefe_carrera', 'asistente', 'contabilidad', 'registros', 'decano'],
            message: 'Se ha proporcionado un rol no valido'
        },
        required: [true, 'No se ha proporcionado el campo rol']
    },
    super_usuario: {
        type: Boolean,
        default: false
    },
    preferencias: {
        type: PreferenciaMateriaSchema,
        requried: [true, 'No se ha proporcionado el campo preferencias']
    },
    preferencias_seguimiento: {
        type: PreferenciaMateriaSchema,
        requried: [true, 'No se ha proporcionado el campo preferencias de seguimiento']
    },
    ver_pendientes_pasadas: {
        type: Boolean,
        default: false
    },
    ver_evaluacion_pares: {
        type: Boolean,
        default: true
    },
    ver_horas_no_asignadas: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
