const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetSchema = Schema({
    evaluacion_pares: {
        type: Date,
        default: '2020-01-01'
    },
    semestre: {
        type: Date,
        default: '2020-01-01'
    },
    value: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Reset', ResetSchema);
