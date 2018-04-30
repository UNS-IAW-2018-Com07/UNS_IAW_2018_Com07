
//ver el capitulo 6 del libro
//la funcion no contempla que retorne vacio o que no existan los parametros

const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

const queryString = require('query-string');

const getViviendas = function (req, res) {

	const parsed = queryString.parse(req.params.filtro);

	if(parsed.piso)
		if(parsed.piso==='null')
			parsed.piso=null;
		else
			parsed.piso=queryString.parse(parsed.piso);
	
	if(parsed.numeroDepto)
		if(parsed.numeroDepto==='null')
			parsed.numeroDepto=null;
		else
			parsed.numeroDepto=queryString.parse(parsed.numeroDepto);
	
	console.log(parsed);

	Vivienda
		.find(parsed)
		.exec((err, viviendas) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(viviendas);
			}
		})
}

module.exports = {
	getViviendas
};