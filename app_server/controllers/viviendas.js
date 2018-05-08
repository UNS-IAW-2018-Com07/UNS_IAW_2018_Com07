var request = require('request');

var apiOptions = {
	//Se setea el URL por defecto del server para desarrollo local. 
	server: "http://localhost:3000"
};

if(process.env.NODE_ENV == 'production'){
	//Si la aplicacion se ejecuta en "production mode" se setea una base URL diferente. 
	apiOptions.server = "https://ktphi.herokuapp.com"; 
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
	res.render('building-detail', { 
  		title: 'Detalle Vivienda',
  		vivienda: body.vivienda,
  		propietario: body.propietario, 
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
 	path='/api/viviendaCompletaPorId/'+req.params.id;
 	solicitud={
 		url: apiOptions.server + path,
 		method: "GET",
 		json: {}
 	};
 	request(solicitud,
 		function(err,response, viviendaCompleta){
 			if(response.statusCode===200){
 				renderDetalleVivienda(req,res,viviendaCompleta);
 			}
 			else{
 				_showError(req,res,response.statusCode);
 			}
 		});
 };

// 	var viviendaFinal={};
// 	var propietarioFinal={};

// 	$.get(apiOptions.server+'/api/viviendasSoloId'+req.params.id, function (err,response,vivienda) {
//        if(response.statusCode===200){
//        		viviendaFinal=vivienda;
//        		//pido el propietario
//        		$.get(apiOptions.server+'/api/propietarios'+vivienda.propietario, function (err,response,propietario) {
//        			if(response.statusCode===200)
//        				propietarioFinal=propietario;
//        			else
//        				_showError(req,res,response.statusCode);
//        		});
//        		//magia de los comentarios
//        		viviendaFinal.comentarios=[];
//        		vivienda.comentarios.forEach(function(comentario){
//        			var filtro={nombre:1, foto:1};
//        			$.get(apiOptions.server+'/api/usuario/'+comentario.idUsuario,filtro, function (err,response,usuario) {
//        				if(response.statusCode===200){
//        					var comentarioFinal=comentario;
//        					comentarioFinal.idUsuario=usuario;
//        					viviendaFinal.comentarios.push(comentarioCompleto);
//        				}
//        				else
//        					_showError(req,res,response.statusCode);
//        			});
//        		});
//        		renderDetalleVivienda(req,res,{vivienda: viviendaFinal, propietario: propietarioFinal});
//        }
//     }); 
