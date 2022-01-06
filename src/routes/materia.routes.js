const express = require('express');
const MateriaController = require('../controllers/materia.controller');
const TokenValidation = require('../verifyToken');

const router = express.Router();

router.post('/create', TokenValidation, MateriaController.createMateria);
router.post('/create/excel', TokenValidation, MateriaController.createMateriasExcel);
router.get('/getAll/:anio/:semestre', MateriaController.getMateriasSemestre);
router.get('/getAll', MateriaController.getMaterias);
router.get('/getOne/:id', TokenValidation, MateriaController.getMateria);
router.get('/getByUserId/:id_jefe_carrera', TokenValidation, MateriaController.getMateriasJefeCarrera);
router.get('/getByUserId/:id_jefe_carrera/:anio/:semestre', TokenValidation, MateriaController.getMateriasSemestreJefeCarrera);
router.put('/update/:id/:docente_antiguo_id?', MateriaController.updateMateria);
router.delete('/delete/:id/:docente_antiguo_id?', TokenValidation, MateriaController.deleteMateria);



module.exports = router;
