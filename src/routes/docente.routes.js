const express = require('express');
const DocenteController = require('../controllers/docente.controller');
const TokenValidation = require('../verifyToken');

const router = express.Router();

router.post('/create', TokenValidation, DocenteController.createDocente);
router.get('/getAll', DocenteController.getDocentes);
router.get('/getOne/:id', TokenValidation, DocenteController.getDocente);
router.get('/getByUserId/:id_jefe_carrera', TokenValidation, DocenteController.getDocentesJefeCarrera);
router.put('/update/:id', TokenValidation, DocenteController.updateDocente);
router.delete('/delete/:id', TokenValidation, DocenteController.deleteDocente);


module.exports = router;
