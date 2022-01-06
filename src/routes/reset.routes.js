const express = require('express');
const ResetController = require('../controllers/reset.controller');
const TokenValidation = require('../verifyToken');

const router = express.Router();

router.post('/eval_pares', TokenValidation, ResetController.resetEvalPares);
router.post('/semestre', TokenValidation, ResetController.resetSemestre);
router.get('/last_reset', TokenValidation, ResetController.lastReset);


module.exports = router;
