const mongoose = require('mongoose');
const Propietario = mongoose.model('Propietario');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getPropietario = function (req, res) {
	if(req.params && req.params.cuit){
		Propietario
			.find({cuit : req.params.cuit})
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
		        		sendJsonResponse(res,200,propietario[0]); 
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
	getPropietario
};
