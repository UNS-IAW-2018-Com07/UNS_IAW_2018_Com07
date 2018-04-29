var express = require('express');
var router = express.Router();
var ctrlViviendas = require('../controllers/viviendas');

// viviendas
router.get('/viviendas', ctrlViviendas.getViviendas);
router.get('/viviendas/:id', ctrlViviendas.getViviendaPorId);

module.exports = router;