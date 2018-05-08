const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');
const Propietario = mongoose.model('Propietario');
const Usuario = mongoose.model('Usuario');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getViviendaCompletaPorId = function (req, res) {

	console.log("entro a la bd");

	if(req.params && req.params.id){

		Vivienda
			.findById(req.params.id)
			.exec((err, vivienda) =>{
				if(!vivienda){
					sendJsonResponse(res, 404, {
						"mensaje": "No se encontró una vivienda con el identificador dado."
					});
					return ; 
				}
				else if (err) { 
					sendJsonResponse(res,400,err); 
					return;     
		        	} 
		        	else {
		        		Propietario.findOne({cuit : vivienda.propietario})
			        		.exec((err, propietario) =>{
							if(!propietario){
								sendJsonResponse(res, 404, {
									"mensaje": "No se encontró propietario."
								});
								return ; 
							}
							else if (err) { 
								sendJsonResponse(res,400,err); 
								return;     
					        	} else {
					        		var i, index=0;
			        				var comentario;
			        				var usuarios=[];
			        				for(i=0; i<vivienda.comentarios.length; i++){
			        					comentario=vivienda.comentarios[i];
			        					Usuario
											.findOne({id : comentario.idUsuario})
											.exec(
												function(err,usuario){
												if(!usuario){
													sendJsonResponse(res, 404, {
														"mensaje": "No se encontró el usuario con el identificador dado."
													});
													return ; 
												}
												else if (err) { 
														sendJsonResponse(res,400,err); 
														return;     
										        	} else {
										        		console.log("entro a index++");
										        		usuarios.push(usuario);
										        		index++;
										        		if(index===vivienda.comentarios.length){
								        					console.log(index);
								        					console.log(vivienda);
								        					console.log(propietario);
								        					console.log(usuarios);
								        					sendJsonResponse(res,200,{vivienda,propietario,usuarios});
								        				}
													}
											})
			        				}
			        				 	
								}
						});
        				
					}
			})
	}
	else {
		sendJsonResponse(res, 404, {
			"mensaje": "No se especificó indentificador en la solicitud."
		});
	}
};

module.exports={
	getViviendaCompletaPorId
}
