const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

const queryString = require('query-string');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getViviendas = function (req, res) {

	console.log(req.query);

	if(req.query){
		Vivienda
			.find(req.query)
			.exec((err, viviendas) =>{
				if(!viviendas){
					sendJsonResponse(res, 404, {
						"mensaje": "No se encontraron viviendas con las características seleccionadas."
					});
					return ; 
				}
				else if (err) { 
					sendJsonResponse(res,400,err); 
					return;     
		        	} else {
		        		sendJsonResponse(res,200,viviendas); 
					}
			})
	}
	else {
		sendJsonResponse(res, 404, {
			"mensaje": "No se especificó filtro en la solicitud."
		});
	}
};

module.exports = {
	getViviendas
};