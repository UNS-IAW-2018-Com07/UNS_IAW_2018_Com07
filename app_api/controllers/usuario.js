const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getUsuario = function (req, res) {
	if(req.params && req.params.id){
		Usuario
			.findOne({id : req.params.id})
			.select('nombre foto')
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
		        		sendJsonResponse(res,200,usuario); 
					}
			})
	}
	else {
		sendJsonResponse(res, 404, {
			"mensaje": "No se especificó indentificador en la solicitud."
		});
	}
};

module.exports = {
	getUsuario
};