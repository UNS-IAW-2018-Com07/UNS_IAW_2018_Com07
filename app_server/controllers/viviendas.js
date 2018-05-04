var request = require('request');

var apiOptions = {
	//Se setea el URL por defecto del server para desarrollo local. 
	server: "http://localhost:3000"
};

if(process.env.NODE_ENV == 'production'){
	//Si la aplicacion se ejecuta en "production mode" se setea una base URL diferente. 
	apiOptions.server = "https://algo-que-no-tenemos.herokuapp.com"; 
}

/* PAGINA DE INICIO. */

var renderPaginaInicio = function(req, res, body){
	var mensaje; 
	if(!(body instanceof Array)){
		mensaje = "Hubo un error durante la conexion."; 
		//Se previene que la vista lance un error. 
		body = [];
	}
	else {
		if(!body.length){
			mensaje = "No se encontraron viviendas en Bahia Blanca."; 
		}
	}
	console.log(req.user); 
	res.render('buildings-list', { 
  		title: 'Inicio',
  		viviendas: body,
  		user: req.user,  
  		mensaje: mensaje
  	});
}

module.exports.homelist = function (req, res) { 
	var solicitud, path; 
	path = '/api/viviendas'; 
	solicitud = {
		url: apiOptions.server + path, 
		method: "GET", 
		json: {}
	}; 
	request(solicitud, function(err,response,body){
		renderPaginaInicio(req,res,body);
	}); 
};

/* DETALLE VIVIENDA */

var renderDetalleVivienda = function(req, res, body){
	console.log(body); 
	res.render('building-detail', { 
  		title: 'Detalle Vivienda',
  		vivienda: body,
  		user: req.user
  	});
}

var _showError = function(req, res, status){
	var title, content; 
	if(status === 404){
		title = "Página no encontrada."
		content = "Lo sentimos, no se pudo encontrar la pagina solicitada."; 
	}
	else {
		title = status + ", ocurrió un error."; 
		content = "Lo sentimos, hubo un error."; 
	}
	res.status(status); 
	res.render('error', {
		title: title, 
		message: content
	}); 
};

module.exports.infoVivienda = function (req, res) { 
	var solicitud, path;  
	path = '/api/viviendas/'+req.params.id; 
	solicitud = {
		url: apiOptions.server + path, 
		method: "GET", 
		json: {}
	}; 
	console.log(solicitud.url); 
	request(
		solicitud, 
		function(err,response,body){
			if(response.statusCode === 200){
				renderDetalleVivienda(req,res,body); 
			}
			else {
				_showError(req,res,response.statusCode); 
			}
	}); 
};