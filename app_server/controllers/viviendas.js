var request = require('request');

var apiOptions = {
	//Se setea el URL por defecto del server para desarrollo local. 
	server: "http://localhost:3000"
};

if(process.env.NODE_ENV == 'production'){
	//Si la aplicacion se ejecuta en "production mode" se setea una base URL diferente. 
	apiOptions.server = "https://algo-que-no-tenemos.herokuapp.com"; 
}

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
	res.render('buildings-list', { 
  		title: 'Inicio',
  		viviendas: body, 
  		mensaje: mensaje
  	});
}

/* GET home page. */
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

/* GET Location Info page. */
module.exports.infoVivienda = function (req, res) { 
  res.render('layout', { title: 'Detalle Vivienda' });
};

/* GET Add Location page. */
module.exports.agregarVivienda = function (req, res) { 
  res.render('layout', { title: 'Añadir Vivienda' });
};