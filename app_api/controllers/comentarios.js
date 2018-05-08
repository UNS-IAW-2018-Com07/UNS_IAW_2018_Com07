const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getComentarios = function (req, res) {
	if(req.params && req.params.idVivienda){
		Vivienda
			.findById(req.params.idVivienda)
			.select('comentarios')
			.exec(
				function(err,vivienda){
					var respuesta; 
					if(!vivienda){
						sendJsonResponse(res, 404, {
							"mensaje": "No se encontró una vivienda con el identificador dado."
						}); 
						return; 
					}
					else if(err){
						sendJsonResponse(res, 400,err); 
						return; 
					}
					if(vivienda.comentarios){ 
						sendJsonResponse(res,200,vivienda.comentarios);  
					}
				}
			);
	}
	else {
		sendJsonResponse(res, 404, {
			"mensaje": "No se especificó indentificador en la solicitud."
		});
	}
}; 

const crearComentario = function(req, res){
	if(req.params && req.params.idVivienda){
			Vivienda
				.findById(req.params.idVivienda)
				.select('comentarios')
				.exec(
					function(err,vivienda){
						if(err){
							sendJsonResponse(res,400,err); 
						}
						else{
							agregarComentario(req,res,vivienda); 
						}
				});
	}
	else {
		sendJsonResponse(res, 404, {
			"mensaje": "No se especificó indentificador en la solicitud."
		});
	}
};

var agregarComentario = function(req,res,vivienda){
	if(!vivienda){
		sendJsonResponse(res, 404, {
			"mensaje": "No se encontró una vivienda con el identificador dado."
		});
	} else {
		vivienda.comentarios.push({
			idUsuario: req.body.usuario,
			calificacion: req.body.calificacion,
			fecha: req.body.fecha,
			texto: req.body.texto
		});
		vivienda.save(function(err,vivienda){
			var comentario; 
			if(err){
				sendJsonResponse(res,400,err); 
			} else {
				actualizarCalificacionPromedio(vivienda._id); 
				comentario = vivienda.comentarios[vivienda.comentarios.length-1]; 
				sendJsonResponse(res, 201, comentario); 
			}
		}); 
	}
}; 

var actualizarCalificacionPromedio = function(idVivienda){
	Vivienda
		.findById(idVivienda)
		.select('calificacion comentarios')
		.exec(
			function(err,vivienda){
				if(!err){
					actualizarCalificacionPromedioVivienda(vivienda); 
				}
		});
}; 

var actualizarCalificacionPromedioVivienda = function(vivienda){
	var i, cantidadComentarios, promedioCalificacion, calificacionTotal;
	if(vivienda.comentarios && vivienda.comentarios.length > 0){
		cantidadComentarios = vivienda.comentarios.length; 
		calificacionTotal = 0; 
		for(i=0; i<cantidadComentarios; i++){
			calificacionTotal = calificacionTotal + vivienda.comentarios[i].calificacion; 
		}
		promedioCalificacion = parseInt (calificacionTotal / cantidadComentarios, 10); 
		vivienda.calificacion = promedioCalificacion; 
		vivienda.save(function(err) {
			if(err){
				console.log(err); 
			} else {
				console.log("Calificacion promedio actualizada a: ", promedioCalificacion);
			}
		});
	}
};

module.exports = {
	getComentarios,
	crearComentario
};