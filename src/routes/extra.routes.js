const express = require('express');
const ExtraController = require('../controllers/extra.controller');
const TokenValidation = require('../verifyToken');

const router = express.Router();

router.get('/pendientes/:id_usuario', ExtraController.getPendientes);
router.post('/sendMail', TokenValidation, ExtraController.generateEmail);


module.exports = router;
