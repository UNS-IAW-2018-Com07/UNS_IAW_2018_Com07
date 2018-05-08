var request = require('request');

var apiOptions = {
	//Se setea el URL por defecto del server para desarrollo local. 
	server: "http://localhost:3000"
};

module.exports.getEstilo = function(req,res){
	if(req.user){
		var solicitud, path; 
		path = '/api/usuario/' + req.user.id; 
		solicitud = {
			url: apiOptions.server + path, 
			method: "GET",
			json: {},
			qs: {estilo:1}
		}; 
		request(solicitud, function(err,response,estilo){
			if(estilo.estilo)
				res.json(estilo.estilo);
			else
				res.json(null);
		}); 	
	}
	else
		res.json(null);
};

module.exports.saveEstilo = function(req,res){

	console.log(req.body);

	if(req.user){
		var solicitud, path; 
		path = '/api/usuario/' + req.user.id; 
		solicitud = {
			url: apiOptions.server + path, 
			method: "POST",
			form: {'estilo': req.body.estilo}
		}; 
		request(solicitud); 
	}

}