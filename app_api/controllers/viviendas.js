const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

const getViviendas = function (req, res) {

	var filtro;

	if(req.query)
		filtro=req.query
	else
		filtro={};

	Vivienda
		.find(filtro,{precio:1,operacion:1,tipoVivienda:1,calificacion:1,direccion:1,piso:1,numeroDepto:1,imagenes:1})
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

const getViviendasSoloId = function (req, res) {

	var filtro;

	if(req.query)
		filtro=req.query
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
	getViviendaPorId,
	getViviendasSoloId
};
