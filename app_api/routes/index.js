var express = require('express');
var router = express.Router();
var ctrlViviendas = require('../controllers/viviendas');
var ctrlFiltrado = require('../controllers/filtrado');

// viviendas
router.get('/viviendas', ctrlViviendas.getViviendas);
router.get('/viviendas/:id', ctrlViviendas.getViviendaPorId);

//filtroBusqueda
router.get('/filtrado/:filtro', ctrlFiltrado.getViviendas);

module.exports = router;