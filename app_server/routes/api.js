var express = require('express');
var router = express.Router();
const viviendaApi = require('../controllers/viviendaApi');

/* GET home page. */
router.get('/viviendas', viviendaApi.getViviendas);

module.exports = router;