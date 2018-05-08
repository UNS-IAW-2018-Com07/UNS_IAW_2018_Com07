const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getViviendas = function (req, res) {

	var filtro;

	if(req.query)
		filtro=req.query;
	else
		filtro={};

	Vivienda
		.find(filtro,{_id:1,precio:1,operacion:1,tipoVivienda:1,calificacion:1,direccion:1,piso:1,numeroDepto:1,imagenes:1})
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

const getViviendasSoloId = function (req, res) {

	var filtro;

	if(req.query)
		filtro=req.query;
	else
		filtro={};

	Vivienda
		.find(filtro,{_id:1})
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
	getViviendas,
	getViviendasSoloId
};
