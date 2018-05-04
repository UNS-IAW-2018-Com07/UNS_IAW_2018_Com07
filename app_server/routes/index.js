var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/viviendas');
var ctrlOthers = require('../controllers/others');

/* Paginas de viviendas. */
router.get('/', ctrlLocations.homelist);
router.get('/viviendas/:id', ctrlLocations.infoVivienda);

/* Other pages. */
router.get('/about', ctrlOthers.about);

module.exports = router;
