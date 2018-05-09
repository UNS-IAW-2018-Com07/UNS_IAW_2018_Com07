var request = require('request');

var apiOptions = {
	//Se setea el URL por defecto del server para desarrollo local. 
	server: "http://localhost:3000"
};

module.exports.getEstilo = function(req,res){

	var usuario=req.user;

	if(usuario){

		var solicitud, path; 
		path = '/api/usuario/' + usuario.id; 
		solicitud = {
			url: apiOptions.server + path, 
			method: "GET",
			json: {},
			qs: {estilo:1}
		}; 
		request(solicitud, function(err,response,estilo){
			if(estilo && estilo.estilo)
				res.json(estilo.estilo);
			else{
				res.json('');
				return;
			}
		}); 	
	}
	else{
		res.json('');
		return;
	}
};

module.exports.saveEstilo = function(req,res){

	var usuario=req.user;

	if(usuario){
		var solicitud, path; 
		path = '/api/usuario/' + usuario.id; 
		solicitud = {
			url: apiOptions.server + path, 
			method: "POST",
			form: {'estilo': req.body.estilo}
		}; 
		request(solicitud); 
	}

}