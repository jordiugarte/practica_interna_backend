const express = require('express');
const UsuarioController = require('../controllers/usuario.controller');
const TokenValidation = require('../verifyToken');

const router = express.Router();

router.post('/create', UsuarioController.createUsuario);
router.get('/getAll', TokenValidation, UsuarioController.getUsuarios);
router.get('/getOne/:id', TokenValidation, UsuarioController.getUsuario);
router.get('/getOneByEmail/:email', UsuarioController.getUsuarioByEmail);
router.put('/update/:id', TokenValidation, UsuarioController.updateUsuario);
router.delete('/delete/:id', TokenValidation, UsuarioController.deleteUsuario);


module.exports = router;
