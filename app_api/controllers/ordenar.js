const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const ordenar = function (req, res) {
	
	var orden;

	if(req.query)
		orden=req.query
	else
		orden={};

	Vivienda
		.find({},{_id:1})
		.sort(orden)
		.exec((err, viviendas) => {
			if(!viviendas){
				//Mongoose no retorna viviendas, por lo que se envia un mensaje de error 404
				sendJsonResponse(res,404,{
					"mensaje": "No se encontraron las viviendas"
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
};

module.exports = {
	ordenar
};
