var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/viviendas');

/* Paginas de viviendas. */
router.get('/', ctrlLocations.homelist);
router.get('/viviendas/:id', ctrlLocations.infoVivienda);


module.exports = router;