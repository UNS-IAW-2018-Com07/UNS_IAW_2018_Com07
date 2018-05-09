var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/viviendas');
var ctrlEstilos= require('../controllers/estilos');

/* Paginas de viviendas. */
router.get('/', ctrlLocations.homelist);
router.get('/viviendas/:id', ctrlLocations.infoVivienda);

/* Estilos */
router.get('/estiloUsuario', ctrlEstilos.getEstilo);

module.exports = router;