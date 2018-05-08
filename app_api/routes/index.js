var express = require('express');
var router = express.Router();

var ctrlViviendas = require('../controllers/viviendas');
var ctrlComentarios = require('../controllers/comentarios'); 
var ctrlPropietarios = require('../controllers/propietarios'); 
var ctrlOrdenar = require('../controllers/ordenar'); 
var ctrlRango = require('../controllers/rango'); 
var ctrlUsuario = require('../controllers/usuario'); 
var ctrlBusqueda = require('../controllers/busqueda'); 

// viviendas
router.get('/viviendas', ctrlViviendas.getViviendas);
router.get('/viviendasSoloId', ctrlViviendas.getViviendasSoloId);
router.get('/viviendas/:id',ctrlViviendas.getViviendaPorId); 

//comentarios 
router.get('/viviendas/:idVivienda/comentarios', ctrlComentarios.getComentarios); 
router.post('/viviendas/:idVivienda/comentarios', ctrlComentarios.crearComentario);

//propietarios
router.get('/propietarios/:cuit', ctrlPropietarios.getPropietario);

//ordenar
router.get('/sort', ctrlOrdenar.ordenar);

//rango
router.get('/rango', ctrlRango.obtenerRango);

//busqueda 
router.get('/busqueda',ctrlBusqueda.getViviendasBusqueda); 

//usuarios 
router.get('/usuario/:id',ctrlUsuario.getUsuario);  
router.post('/usuario/:id',ctrlUsuario.saveEstilo); 

module.exports = router;

