var express = require('express');
var router = express.Router();
var ctrlViviendas = require('../controllers/viviendas');
var ctrlFiltrado = require('../controllers/filtrado');
var ctrlComentarios = require('../controllers/comentarios'); 
var ctrlPropietarios = require('../controllers/propietarios'); 

// viviendas
router.get('/viviendas', ctrlViviendas.getViviendas);
router.get('/viviendas/:id', ctrlViviendas.getViviendaPorId);
router.get('/viviendasResumidas', ctrlViviendas.getViviendasResumidas);

//filtroBusqueda
router.get('/filtrado', ctrlFiltrado.getViviendas);

//comentarios 
router.get('/viviendas/:idVivienda/comentarios', ctrlComentarios.getComentarios); 
router.post('/viviendas/:idVivienda/comentarios', ctrlComentarios.crearComentario);

//propietarios
router.get('/propietarios/:cuit', ctrlPropietarios.getPropietario);

module.exports = router;

