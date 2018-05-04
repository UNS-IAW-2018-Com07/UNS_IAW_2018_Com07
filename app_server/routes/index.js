var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/viviendas');
var ctrlOthers = require('../controllers/others');

/* Locations pages. */
router.get('/', ctrlLocations.homelist);
router.get('/viviendas/:idVivienda', ctrlLocations.infoVivienda);
router.get('/viviendas/agregarVivienda', ctrlLocations.agregarVivienda);

/* Other pages. */
router.get('/about', ctrlOthers.about);

module.exports = router;
