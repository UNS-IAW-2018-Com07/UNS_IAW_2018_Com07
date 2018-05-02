var express = require('express');
var router = express.Router();
var ctrlViviendas = require('../controllers/viviendas');
var ctrlFiltrado = require('../controllers/filtrado');
var ctrlComentarios = require('../controllers/comentarios'); 

// viviendas
router.get('/viviendas', ctrlViviendas.getViviendas);
router.get('/viviendas/:id', ctrlViviendas.getViviendaPorId);

//filtroBusqueda
router.get('/filtrado', ctrlFiltrado.getViviendas);

//comentarios 
router.get('/viviendas/:idVivienda/comentarios', ctrlComentarios.getComentarios); 
router.post('/viviendas/:idVivienda/comentarios', ctrlComentarios.crearComentario); 

module.exports = router;