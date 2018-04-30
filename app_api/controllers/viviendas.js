const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getViviendas = function (req, res) {
	Vivienda
		.find()
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

const getViviendaPorId = function (req, res) {
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
		        	} else {
		        		sendJsonResponse(res,200,vivienda); 
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
	getViviendas,
	getViviendaPorId
};
