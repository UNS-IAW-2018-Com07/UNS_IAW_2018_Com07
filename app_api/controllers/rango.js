const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const obtenerRango = function (req, res) {
	
	var filtro;

	if(req.query)
		filtro=req.query;
	else
		filtro={};

	Vivienda
		.find(filtro,{precio:1})
		.sort({precio: 1}) //ordena de menor a mayor
		.exec((err, precios) => {

			if(!precios || !precios[0]){
				//Mongoose no retorna precios, por lo que se envia un mensaje de error 404
				sendJsonResponse(res,404,{
					"mensaje": "No se encontraron los precios de las viviendas."
				}); 
				return;
			}
			else if (err) { 
					sendJsonResponse(res, 400, err); 
					return; 
	        	} else {
	        		var rango={minimo: precios[0].precio, maximo: precios[precios.length-1].precio};
	        		sendJsonResponse(res,200,rango); 
				}
		})
};

module.exports = {
	obtenerRango
};
