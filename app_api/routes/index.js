var express = require('express');
var router = express.Router();

var ctrlViviendas = require('../controllers/viviendas');
var ctrlComentarios = require('../controllers/comentarios'); 
var ctrlPropietarios = require('../controllers/propietarios'); 
var ctrlOrdenar = require('../controllers/ordenar'); 
var ctrlRango = require('../controllers/rango'); 
var ctrlUsuario = require('../controllers/usuario'); 

// viviendas
router.get('/viviendas', ctrlViviendas.getViviendas);
router.get('/viviendas/:id', ctrlViviendas.getViviendaPorId);
router.get('/viviendasSoloId', ctrlViviendas.getViviendasSoloId);

//comentarios 
router.get('/viviendas/:idVivienda/comentarios', ctrlComentarios.getComentarios); 
router.post('/viviendas/:idVivienda/comentarios', ctrlComentarios.crearComentario);

//propietarios
router.get('/propietarios/:cuit', ctrlPropietarios.getPropietario);

//ordenar
router.get('/sort', ctrlOrdenar.ordenar);

//ordenar
router.get('/rango', ctrlRango.obtenerRango);

//usuarios 
router.get('/usuario/:id',ctrlUsuario.getUsuario); 

module.exports = router;

