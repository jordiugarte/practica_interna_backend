const UsuarioController = require('../models/usuario.model');
const default_response = require('../utils').default_response;

const controller = {

    createUsuario: function (req, res) {
        let usuario = new UsuarioController(Object.assign(req.body));
        usuario.save(default_response(req, res));
    },

    getUsuario: function(req, res){
        let usuarioID = req.params.id;
        UsuarioController.findById(usuarioID, default_response(req, res));
    },

    getUsuarioByEmail: function(req, res){
        let email = req.params.email;
        UsuarioController.findOne({email: email}).exec(default_response(req, res));
    },

    getUsuarios : function (req, res) {
        UsuarioController.find({}).exec(default_response(req, res));
    },

    updateUsuario: function(req, res){
        let usuarioId = req.params.id;
        let update = req.body;
        UsuarioController.findByIdAndUpdate(usuarioId, update, {new: true}, default_response(req, res));
    },

    deleteUsuario: function(req, res){
        let usuarioId = req.params.id;
        UsuarioController.findByIdAndDelete(usuarioId, default_response(req, res));
    }
};

module.exports = controller;
