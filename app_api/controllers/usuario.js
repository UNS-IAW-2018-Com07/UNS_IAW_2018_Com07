const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getUsuario = function (req, res) {
	var valores;
	if(req.query)
		valores=req.query;
	else
		valores = {};

	if(req.params && req.params.id){
		Usuario
			.findOne({id : req.params.id}, valores)
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

const saveEstilo = function(req,res){
	if(req.isAuthenticated()){
		Usuario
			.update({id : req.user.id}, req.body)
			.exec(
				function(err){
					if (err) { 
						sendJsonResponse(res,400,err); 
						return;     
					}
					else{
						sendJsonResponse(res,201,{"mensaje":"ok"}); 
						return;  
					}

			});
	}
	else
		sendJsonResponse(res,404,{"mensaje": "No está autenticado"});
}

module.exports = {
	getUsuario,
	saveEstilo
};