const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getViviendasBusqueda = function (req, res) {
	if(req.query){
		Vivienda
		.find({$or: [{"descripcion" : {$regex : ".*"+req.query+".*"}}, 
					{"direccion" : {$regex : ".*"+req.query+".*"}}]},{_id:1})
		.exec((err, viviendas) => {
			if(!viviendas){
				//Mongoose no retorna viviendas, por lo que se envia un mensaje de error 404
				sendJsonResponse(res,404,{
					"mensaje": "No se encontraron viviendas"
				}); 
				return;
			}
			else if (err) { 
					sendJsonResponse(res, 400, err); 
					return; 
	        	} else {
	        		sendJsonResponse(res,200,viviendas); 
				}
		})	
	}
	else {
		sendJsonResponse(res, 400, err); 
		return; 
	}
}

module.exports = {
	getViviendasBusqueda
}