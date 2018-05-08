const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getViviendasBusqueda = function (req, res) {

		Vivienda
		.find({},{_id:1,descripcion:1,direccion:1})
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

module.exports = {
	getViviendasBusqueda
}