var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/viviendas');
var ctrlOthers = require('../controllers/others');
var ctrlEstilos= require('../controllers/estilos');

/* Paginas de viviendas. */
router.get('/', ctrlLocations.homelist);
router.get('/viviendas/:id', ctrlLocations.infoVivienda);

/* Other pages. */
router.get('/about', ctrlOthers.about);

/* Estilos */
router.get('/estiloUsuario', ctrlEstilos.getEstilo);
router.post('/estiloUsuario', ctrlEstilos.saveEstilo);

module.exports = router;